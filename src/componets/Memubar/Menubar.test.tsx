import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import  Menubar  from './Menubar';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';

describe('men', () => {
  it('renders menu', () => {
   render(<Provider store={store}>
        <BrowserRouter>
          <Menubar />
        </BrowserRouter>
      </Provider>);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
    fireEvent.click(screen.getByText('Popular',))
    expect(screen.getAllByRole('menuitem')[1]).toHaveClass('ant-menu-item-selected')
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug()
  });

});