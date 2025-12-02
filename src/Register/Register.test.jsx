import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Store from '../Store';
import Register from './index';

describe('Register', () => {
  it('renders the registration form', () => {
    render(
      <HashRouter>
        <Store>
          <Register />
        </Store>
      </HashRouter>
    );

    // Check that the registration header is present
    expect(screen.getByText('EthicsNet - Sign up')).toBeInTheDocument();

    // Check that form fields are present
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });
});
