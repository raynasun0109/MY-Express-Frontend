import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductDetail from '../pages/ProductDetail/ProductDetail';

// Mocking services
jest.mock('../service/ProductService', () => ({
    getOneProduct: jest.fn(),
    latestProducts: jest.fn(),
}));

jest.mock('../service/UserService', () => ({
    getOneUser: jest.fn(),
}));

const mockStore = configureStore([]);

describe('ProductDetail', () => {
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();

    })
    
    let store;

    beforeEach(() => {
        store = mockStore({
            shoppingCart: {},
            products: {
                totalNumber: 0
            }
        });
    });

    test('renders ProductDetail component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ProductDetail/>
                </Router>
            </Provider>
        );
    });
});
