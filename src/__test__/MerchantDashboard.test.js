import React from 'react';
import {render, screen,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import MerchantDashboard from '../pages/Merchant/MerchantDashboard/MerchantDashboard';
import {
    getTotalFromTranscation,
    getDailyTotalFromTranscation,
    getWeeklyTranscation
} from '../service/TransactionService';
import {MemoryRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
// Mock the required modules
jest.mock('../service/TransactionService', () => ({
    getTotalFromTranscation: jest.fn(),
    getDailyTotalFromTranscation: jest.fn(),
    getWeeklyTranscation: jest.fn(),
}));
const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});
describe('MerchantDashboard component', () => {
    const originalScrollTo = window.scrollTo;

    beforeEach(() => {
        getTotalFromTranscation.mockResolvedValue({data: {total: 100}});
        getDailyTotalFromTranscation.mockResolvedValue({data: {number: 10, list: []}});
        getWeeklyTranscation.mockResolvedValue({data: {list: []}});
        window.scrollTo = jest.fn();

    });

    afterEach(() => {
        window.scrollTo = originalScrollTo;
        jest.clearAllMocks();
    });

    test('renders the component', async () => {
        render(<Provider store={store}><MemoryRouter><MerchantDashboard/></MemoryRouter></Provider>);
        try {
            await waitFor(() => {
                expect(screen.getByText('Weekly Sales')).toBeInTheDocument();
                expect(screen.getByText('Weekly Estimated Sales')).toBeInTheDocument();
                expect(screen.getByText('Weekly Orders')).toBeInTheDocument();
                expect(screen.getByText('Weekly Report')).toBeInTheDocument();
            })
        } catch (err) {
            console.log(err);
        }
        
    });

    test('calls the required API methods on load', async () => {
     render(<Provider store={store}>
                <MemoryRouter>
                    <MerchantDashboard/>
                </MemoryRouter>
            </Provider>);

     try {
        await waitFor(() => {
            expect(getTotalFromTranscation).toHaveBeenCalledTimes(3);
            expect(getDailyTotalFromTranscation).toHaveBeenCalledTimes(1);
            expect(getWeeklyTranscation).toHaveBeenCalledTimes(1);
        })
    } catch (err) {
        console.log(err);
    }
    });
});

// test('two plus two is four', () => {
//     expect(2 + 2).toBe(4);
//   });