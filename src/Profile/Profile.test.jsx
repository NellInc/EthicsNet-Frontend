import { beforeEach, afterEach, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './index';
import { apiFetch } from '../globals';

vi.mock('../globals', () => ({ apiFetch: vi.fn() }));
beforeEach(() => {
  apiFetch.mockReset();
  localStorage.setItem('userId', 'abc');
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());
const user = Object.fromEntries(['lastName', 'email', 'country', 'state', 'age', 'political', 'religious', 'gender', 'sexualOrientation', 'language', 'education', 'social', 'earnings', 'ethnicity'].map(key => [key, '']));
const response = (status, firstName) => ({ status, json: async () => ({ user: { ...user, firstName } }) });

test('successful save refreshes authoritative profile data', async () => {
  apiFetch.mockResolvedValueOnce(response(200, 'Existing'))
    .mockResolvedValueOnce(response(200))
    .mockResolvedValueOnce(response(200, 'Refreshed'));
  render(<Profile />);
  await screen.findByDisplayValue('Existing');
  fireEvent.submit(screen.getByRole('button', { name: 'Save' }).closest('form'));
  await screen.findByDisplayValue('Refreshed');
  expect(apiFetch.mock.calls.map(([path, options]) => [path, options.method])).toEqual([
    ['/api2/user', 'GET'], ['/api2/user/abc', 'PUT'], ['/api2/user', 'GET'],
  ]);
});

test('failed save retains editable data and does not refresh as if saved', async () => {
  apiFetch.mockResolvedValueOnce(response(200, 'Existing'))
    .mockResolvedValueOnce(response(500));
  render(<Profile />);
  const name = await screen.findByDisplayValue('Existing');
  fireEvent.change(name, { target: { value: 'Unsaved' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Save' }).closest('form'));
  await waitFor(() => expect(console.error).toHaveBeenCalled());
  expect(apiFetch).toHaveBeenCalledTimes(2);
  expect(screen.getByDisplayValue('Unsaved')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
});
