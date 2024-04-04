import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Onemail from './Onemail';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



describe('test component mail', () => {
  it('renders spinner', async () => {
    const mail = render(
      <Provider store={store}>
        <BrowserRouter>
          <Onemail />
        </BrowserRouter>
      </Provider>,
    );

    expect(mail).toMatchSnapshot();

    const btn = screen.getByTestId('z');

    expect(btn).toBeInTheDocument();
  });


});