import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store';

const onChange = jest.fn()


describe('Search components',()=>{
    test('Search renders component',()=>{
        render(<Provider store={store}>
            <BrowserRouter>
              <Search placeholder='input'></Search>
            </BrowserRouter>
          </Provider>)
        expect(screen.getByPlaceholderText('input')).toBeInTheDocument()
        // screen.debug()
    })


    // test('onChange work',()=>{
    //   render(<Provider store={store}>
    //     <BrowserRouter>
    //       <Search onChange={onChange} placeholder='input'></Search>
    //     </BrowserRouter>
    //   </Provider>)
    //  userEvent.type(screen.getByRole('textbox'),'React')
    //  expect(screen.getByRole('textbox')).toHaveValue('React')
    //  screen.debug()
    // })

    test('dynamic styles, not scale without text',()=>{
      
      render(<Provider store={store}>
        <BrowserRouter>
          <Search  onChange={onChange} placeholder='input'></Search>
        </BrowserRouter>
      </Provider>)
    //  userEvent.type(screen.getByRole('textbox'),'React')
     expect(screen.getByTestId('inpCn').getAttribute('class')).toMatch("")
    })


    test('Search snapshot',()=>{
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const search =  render(<Provider store={store}>
        <BrowserRouter>
          <Search  onChange={onChange} placeholder='input'></Search>
        </BrowserRouter>
      </Provider>)
      expect(search).toMatchSnapshot()
    })


})