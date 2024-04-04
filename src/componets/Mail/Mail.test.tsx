import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Mail from './Mail';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('test component mail', () => {
  it('renders mail', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const mail = render(
      <Provider store={store}>
        <BrowserRouter>
          <Mail />
        </BrowserRouter>
      </Provider>,
    );
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(mail).toMatchSnapshot()
    expect(screen.getByText('Username')).toBeInTheDocument()
  });
});
