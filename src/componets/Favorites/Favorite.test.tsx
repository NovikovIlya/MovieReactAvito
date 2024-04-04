import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Favorites } from './Favorites';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';



describe('test component Favorite', () => {
  it('renders Favorite', async () => {
    const {getByText,getByTestId} = render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>,
    );
    const btn = getByTestId('z')
    expect(btn).toBeInTheDocument()
    
  });


});