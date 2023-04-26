import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import MerchantProducts from '../pages/Merchant/MerchantProducts/MerchantProducts';
import {MemoryRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';

const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});
// Mock the required modules
jest.mock('../service/ProductService', () => ({
    getProductsFromMerchant: () => Promise.resolve({data: []}),
    addOneProduct: () => Promise.resolve({status: 200}),
    deleteOneProduct: () => Promise.resolve({}),
    updateOneProduct: () => Promise.resolve({status: 200}),
}));

describe('MerchantProducts component', () => {
    const originalScrollTo = window.scrollTo;
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalScrollTo;
        jest.clearAllMocks();
    });


    test('renders the component', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MerchantProducts/> </MemoryRouter>
            </Provider>
        );

        try {
            await waitFor(() => {
                expect(screen.getByText('Add Product')).toBeInTheDocument();

            })
        } catch (err) {
            console.log(err);
        }
    });


});
