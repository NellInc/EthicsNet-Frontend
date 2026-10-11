import { beforeEach, afterEach, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Annotation from './index';
import { apiFetch } from '../globals';
import { Notification } from '../Store';

vi.mock('../globals', () => ({ apiFetch: vi.fn() }));
let notification;
beforeEach(() => {
  apiFetch.mockReset();
  notification = vi.fn();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

function show() {
  render(<MemoryRouter initialEntries={['/profile/annotations/edit/abc']}>
    <Notification.Provider value={notification}>
      <Routes><Route path='/profile/annotations/edit/:id' element={<Annotation />} /></Routes>
    </Notification.Provider>
  </MemoryRouter>);
}
const annotation = { content: 'Existing', category: 'morally preferable', createdAt: '2026-10-11T00:00:00Z' };
const response = (status, data) => ({ status, json: async () => data });

test('failed fetch releases the loader and disables saving without crashing', async () => {
  apiFetch.mockRejectedValue(new Error('There was an error connecting to the server'));
  show();
  expect(await screen.findByRole('button', { name: 'Save' })).toBeDisabled();
  expect(screen.getByRole('link', { name: 'cancel' })).toBeInTheDocument();
  expect(apiFetch).toHaveBeenCalledTimes(1);
  expect(apiFetch.mock.calls[0][0]).toBe('/api2/text/abc');
});

test('router ID loads and successful saving explicitly refreshes annotation data', async () => {
  apiFetch.mockResolvedValueOnce(response(200, { anotation: annotation }))
    .mockResolvedValueOnce(response(200, {}))
    .mockResolvedValueOnce(response(200, { anotation: { ...annotation, content: 'Refreshed' } }));
  show();
  await screen.findByDisplayValue('Existing');
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await screen.findByDisplayValue('Refreshed');
  expect(apiFetch.mock.calls.map(([path, options]) => [path, options.method])).toEqual([
    ['/api2/text/abc', 'GET'], ['/api2/text/abc', 'PUT'], ['/api2/text/abc', 'GET'],
  ]);
  expect(notification).toHaveBeenCalledWith('annotation saved!');
});

test('failed annotation PUT does not report success or refresh saved data', async () => {
  apiFetch.mockResolvedValueOnce(response(200, { anotation: annotation }))
    .mockResolvedValueOnce(response(500, { error: 'Synthetic failure' }));
  show();
  await screen.findByDisplayValue('Existing');
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(notification).toHaveBeenCalledWith('Synthetic failure', 'there was an error', 'danger'));
  expect(notification).not.toHaveBeenCalledWith('annotation saved!');
  expect(apiFetch).toHaveBeenCalledTimes(2);
  expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
});
