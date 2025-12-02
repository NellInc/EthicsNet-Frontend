import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PublicRoute, PrivateRoute, PublicRouteRedirectHowtoUse } from './index';

// Mock the globals module
vi.mock('../globals', () => ({
  apiURL: 'http://localhost:3001',
}));

// Mock the Loader component
vi.mock('../components', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe('PublicRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when not restricted', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={
              <PublicRoute restricted={false}>
                <div>Public Content</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });

  it('renders children when restricted but user is not logged in', () => {
    localStorage.removeItem('isLogged');

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute restricted={true}>
                <div>Login Form</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  it('redirects to home when restricted and user is logged in', () => {
    localStorage.setItem('isLogged', 'true');

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute restricted={true}>
                <div>Login Form</div>
              </PublicRoute>
            }
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Login Form')).not.toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('sets document title when title prop is provided', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route
            path="/test"
            element={
              <PublicRoute title="Test Title" restricted={false}>
                <div>Content</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe('Test Title');
  });
});

describe('PublicRouteRedirectHowtoUse', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to how-to-use when restricted and user is logged in', () => {
    localStorage.setItem('isLogged', 'true');

    render(
      <MemoryRouter initialEntries={['/landing']}>
        <Routes>
          <Route
            path="/landing"
            element={
              <PublicRouteRedirectHowtoUse restricted={true}>
                <div>Landing Page</div>
              </PublicRouteRedirectHowtoUse>
            }
          />
          <Route path="/how-to-use" element={<div>How To Use Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Landing Page')).not.toBeInTheDocument();
    expect(screen.getByText('How To Use Page')).toBeInTheDocument();
  });

  it('renders children when user is not logged in', () => {
    localStorage.removeItem('isLogged');

    render(
      <MemoryRouter initialEntries={['/landing']}>
        <Routes>
          <Route
            path="/landing"
            element={
              <PublicRouteRedirectHowtoUse restricted={true}>
                <div>Landing Page</div>
              </PublicRouteRedirectHowtoUse>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });
});

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children when user is logged in', () => {
    localStorage.setItem('isLogged', 'true');

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <div>Profile Page</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });

  it('redirects to login when user is not logged in', () => {
    localStorage.removeItem('isLogged');

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <div>Profile Page</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Profile Page')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('sets document title when title prop is provided', () => {
    localStorage.setItem('isLogged', 'true');

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute title="User Profile">
                <div>Profile Page</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe('User Profile');
  });

  it('redirects when isLogged is set to something other than true', () => {
    localStorage.setItem('isLogged', 'false');

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <div>Profile Page</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Profile Page')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
