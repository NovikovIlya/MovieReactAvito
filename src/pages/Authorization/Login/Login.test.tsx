import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import  LoginPage  from './LoginPage';
import { Provider } from 'react-redux';
import store from '../../../store';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
  it('renders correctly', () => {
   render(<Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>);
    expect(screen.getByText('Please wait, the server is waking up on Render (about 30 sec)')).toBeInTheDocument();
  });



//   it('shows error message when username is invalid', async () => {
//     const { getByText, getByTestId } = render(<LoginPage />);
//     const usernameInput = screen.getByPlaceholderText('Username');
//     const errorMessage = screen.getByTestId('username-error');
//     fireEvent.change(usernameInput, { target: { value: '' } });
//     await waitFor(() => {
//       expect(errorMessage.textContent).toContain('Required');
//     });
//   });

//   it('hides error message when username is valid', async () => {
//     const { getByText, getByTestId } = render(<LoginPage />);
//     const usernameInput = screen.getByPlaceholderText('Username');
//     const errorMessage =screen.getByTestId('username-error');
//     fireEvent.change(usernameInput, { target: { value: 'testuser' } });
//     await waitFor(() => {
//       expect(errorMessage.textContent).not.toContain('Required');
//     });
//   });
});