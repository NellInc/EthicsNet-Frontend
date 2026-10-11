import { afterEach, expect, test, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

async function client(url, dev = false) {
  vi.stubEnv('DEV', dev);
  vi.stubEnv('VITE_API_URL', url);
  vi.resetModules();
  return import('./globals');
}

test.each([undefined, '', 'http://api.example', '/api', 'https://',
  'https://user:pass@api.example', 'https://api.example/path',
  'https://api.example/./', 'https://api.example /', 'https://api.example/?x=1', 'https://api.example/#x', 'https:\\api.example'])
('invalid production configuration %s fails before dispatch', async url => {
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  const { default: api, apiFetch } = await client(url);
  const adapter = vi.fn();
  await expect(apiFetch('/api2/user', {})).rejects.toThrow('connecting to the server');
  await expect(api.get('/api2/user', { adapter })).rejects.toThrow('connecting to the server');
  expect(fetch).not.toHaveBeenCalled();
  expect(adapter).not.toHaveBeenCalled();
});

test('valid HTTPS preserves native fetch options and response', async () => {
  const response = new Response('{"ok":true}', { status: 200 });
  const fetch = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetch);
  const { apiFetch, default: api } = await client('https://api.example');
  const options = { method: 'POST', body: '{"value":1}', headers: { Authorization: 'Bearer synthetic' } };
  expect(await apiFetch('/api2/text', options)).toBe(response);
  expect(fetch).toHaveBeenCalledWith('https://api.example/api2/text', options);
  const adapter = vi.fn(async config => ({ config, status: 200, data: { message: 'ok' } }));
  await api.post('/api2/text', { value: 1 }, { adapter });
  expect(adapter.mock.calls[0][0].url).toBe('https://api.example/api2/text');
});

test.each(['https://other.example/api', '//other.example/api', '/\\other.example/api'])
('origin override %s fails for both clients', async path => {
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  const { apiFetch, default: api } = await client('https://api.example');
  const adapter = vi.fn();
  await expect(apiFetch(path, {})).rejects.toThrow();
  await expect(api.get(path, { adapter, baseURL: 'https://other.example' })).rejects.toThrow();
  expect(fetch).not.toHaveBeenCalled();
  expect(adapter).not.toHaveBeenCalled();
});

test('development retains the existing local endpoint', async () => {
  const fetch = vi.fn().mockResolvedValue({});
  vi.stubGlobal('fetch', fetch);
  const { apiFetch } = await client(undefined, true);
  await apiFetch('/auth/login', {});
  expect(fetch).toHaveBeenCalledWith('http://localhost/auth/login', {});
});
