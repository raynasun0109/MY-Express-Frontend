import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers';
import UserOrders from '../pages/Users/UserOrders/UserOrders';
import {MemoryRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom';

// Helper function to render components with Redux
function renderWithRedux(ui, {store = createStore(rootReducer)} = {}) {
    return {
        ...render(<Router><Provider store={store}>{ui}</Provider></Router>),
        store,
    };
}

describe('UserOrders', () => {
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();
    })
    
    test('renders UserOrders list and order summary', async () => {
        // Prepare mock data for the products list
        const mockProducts = [
            {
                uuid: '1',
                name: 'Product 1',
                image: 'image-url-1',
                price: 100,
                qty: 1,
            },
            {
                uuid: '2',
                name: 'Product 2',
                image: 'image-url-2',
                price: 200,
                qty: 2,
            },
        ];

        // Set up mock Redux store with the mock data
        const mockStore = createStore(rootReducer, {
            products: {shoppingCart: mockProducts},
        });

        renderWithRedux(<UserOrders/>, {store: mockStore});


    });


});
