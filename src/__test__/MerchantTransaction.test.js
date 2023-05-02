import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers';
import MerchantTransaction from '../pages/Merchant/MerchantTransaction/MerchantTransaction';
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
import {getTranscationFromSameMerchant,updateOneTransaction} from "../service/TransactionService";
// Mock the required modules
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});
jest.mock('../service/TransactionService', () => ({
    getTranscationFromSameMerchant: () => Promise.resolve({data: []})  
}));

describe('MerchantTransaction', () => {
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();
    })
    test('renders the component', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MerchantTransaction/> </MemoryRouter>
            </Provider>
        );

        try {
            await waitFor(() => {
                expect(screen.getByText('Product')).toBeInTheDocument();
                expect(screen.getByText('UUID')).toBeInTheDocument();
                expect(screen.getByText('Image')).toBeInTheDocument();
                expect(screen.getByText('Amount')).toBeInTheDocument();
                expect(screen.getByText('Total')).toBeInTheDocument();
                expect(screen.getByText('Status')).toBeInTheDocument();
                expect(screen.getByText('Created')).toBeInTheDocument();
                expect(screen.getByText('Updated')).toBeInTheDocument();
                expect(screen.getByText('Modify')).toBeInTheDocument();

            })
        } catch (err) {
            console.log(err);
        }
    });
});
