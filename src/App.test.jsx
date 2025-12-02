import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Store from './Store';
import Main from './Main';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <HashRouter>
        <Store>
          <Main />
        </Store>
      </HashRouter>
    );

    // Check that the app renders the Home link in the navbar
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
