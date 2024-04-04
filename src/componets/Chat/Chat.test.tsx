import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import  Chat  from './Chat';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';
import userEvent  from '@testing-library/user-event';

describe('chat', () => {
  it('renders chat', () => {
   render(<Provider store={store}>
        <BrowserRouter>
          <Chat />
        </BrowserRouter>
      </Provider>);

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
    
    
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
  });

});