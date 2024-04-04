import {render,screen} from '@testing-library/react'

import MovieList from './MovieList'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store'

const data = [{
    Title: 'test123',
    Year: 'test',
    imdbID: 'test',
    Type: 'test',
    Poster: 'test',
},{
    Title: 'test2',
    Year: 'tes2t',
    imdbID: 'test2',
    Type: 'test2',
    Poster: 'test2',
}]
const data2 = []

describe('MovieList component',()=>{
    test('MovieList renders',()=>{   
        render(    <Provider store={store}>
            <BrowserRouter>
              <MovieList movie={data}/>
            </BrowserRouter>
          </Provider>)
        
        expect(screen.getAllByText(/test123/i)[0]).toBeInTheDocument()
    })

    // test('MovieList Render without data',()=>{
    //     render(    <Provider store={store}>
    //         <BrowserRouter>
    //           <MovieList movie={data2}/>
    //         </BrowserRouter>
    //       </Provider>)
    //     expect(screen.queryAllByRole('link')[0]).toBeUndefined()
    // })

    test('MovieList snapshot',()=>{
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const list =   render(    <Provider store={store}>
            <BrowserRouter>
              <MovieList movie={data}/>
            </BrowserRouter>
          </Provider>)
        expect(list).toMatchSnapshot()
    })

    test('MovieList empty snapshot',()=>{
        // eslint-disable-next-line testing-library/render-result-naming-convention
         const list =   render(    <Provider store={store}>
                    <BrowserRouter>
                      <MovieList movie={data2}/>
                    </BrowserRouter>
                  </Provider>)
        expect(list).toMatchSnapshot()
    })
})