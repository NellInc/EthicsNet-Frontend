import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Store from '../Store';
import Navbar from './index';

// Mock the globals module
vi.mock('../globals', () => ({
  apiURL: 'http://localhost:3001',
}));

// Mock fetch for the user API call
const mockFetch = vi.fn();
global.fetch = mockFetch;

const renderNavbar = () => {
  return render(
    <HashRouter>
      <Store>
        <Navbar />
      </Store>
    </HashRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the navbar with Home link', () => {
    renderNavbar();

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders About link', () => {
    renderNavbar();

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      localStorage.removeItem('isLogged');
    });

    it('shows Log in button', () => {
      renderNavbar();

      expect(screen.getByText('Log in')).toBeInTheDocument();
    });

    it('shows Register button', () => {
      renderNavbar();

      expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('does not show Profile button', () => {
      renderNavbar();

      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });

    it('does not show Logout button', () => {
      renderNavbar();

      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('token', 'fake-token');
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ user: { isAdmin: false } }),
      });
    });

    it('shows Profile button', () => {
      renderNavbar();

      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('shows Logout button', () => {
      renderNavbar();

      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('shows Text annotations button', () => {
      renderNavbar();

      expect(screen.getByText('Text annotations')).toBeInTheDocument();
    });

    it('does not show Log in button', () => {
      renderNavbar();

      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    });

    it('does not show Register button', () => {
      renderNavbar();

      expect(screen.queryByText('Register')).not.toBeInTheDocument();
    });
  });

  describe('when user is admin', () => {
    beforeEach(() => {
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('token', 'fake-token');
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ user: { isAdmin: true } }),
      });
    });

    it('shows Admin button for admin users', async () => {
      renderNavbar();

      // Wait for the async admin check
      const adminLink = await screen.findByText('Admin');
      expect(adminLink).toBeInTheDocument();
    });
  });
});
