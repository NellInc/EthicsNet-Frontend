import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Store from '../Store';
import Login from './index';

// Mock the API module
vi.mock('../globals', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { msg: 'OK' } }),
    post: vi.fn(),
  },
}));

const renderLogin = () => {
  return render(
    <HashRouter>
      <Store>
        <Login />
      </Store>
    </HashRouter>
  );
};

describe('Login', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form', () => {
    renderLogin();

    // Check that the login header is present
    expect(screen.getByText('EthicsNet - Login')).toBeInTheDocument();

    // Check that form fields are present
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders email and password input fields', () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders the login button', () => {
    renderLogin();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('type', 'submit');
  });

  it('renders link to register page', () => {
    renderLogin();

    expect(screen.getByText(/don't you have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
  });

  it('allows user to type in email field', () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('allows user to type in password field', () => {
    renderLogin();

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });
});
