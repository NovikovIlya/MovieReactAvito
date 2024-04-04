import {render,screen} from '@testing-library/react'
import MainPage from './MainPage'
import { Provider } from 'react-redux'
import store from '../../store'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
 


describe('MainPage component',()=>{
    test('MainPage work Search',async()=>{
        render( <Provider store={store}>
            <BrowserRouter>
              <MainPage />
            </BrowserRouter>
          </Provider>)
        
        expect(screen.queryByDisplayValue(/React/)).toBeNull();
        await userEvent.type(screen.getByTestId("inpCn2"),'React');
        // eslint-disable-next-line testing-library/prefer-presence-queries
        expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument()
    })

    test('MainPage snapshot',async()=>{
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const MainPageValue = render( <Provider store={store}>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </Provider>)
      
      expect(MainPageValue).toMatchSnapshot()
  })
})