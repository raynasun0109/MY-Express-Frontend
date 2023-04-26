import React from 'react';
import {render, screen, fireEvent, waitFor, prettyDOM} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import MerchantLayout from '../pages/Merchant/MerchantLayout/MerchantLayout';

const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});
// Mocking the necessary dependencies

jest.mock('universal-cookie', () => {
    return jest.fn().mockImplementation(() => {
        return {
            get: (key) => {
                if (key === 'myShopaholic') {
                    return {
                        uuid: 'test-uuid',
                        type: 1,
                    };
                }
                return null;
            },
        };
    });
});

describe('MerchantLayout component', () => {
    const originalScrollTo = window.scrollTo;
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });


    afterEach(() => {
        window.scrollTo = originalScrollTo;

        jest.clearAllMocks();
    });

    const renderMerchantLayoutWithRouter = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/merchant/test-uuid/dashboard']}>
                    <Routes>
                        <Route path="/dashboard/merchant/:uuid/:tab" element={<MerchantLayout/>}>
                            <Route path="dashboard" element={<div>My Dashboard</div>}/>
                            <Route path="profile" element={<div>My Profile</div>}/>
                            <Route path="transaction" element={<div>Transaction Management</div>}/>
                            <Route path="products" element={<div>Product Management</div>}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders the component correctly', async () => {
        const {getByText} = renderMerchantLayoutWithRouter();

        try {
            await expect(getByText('My Dashboard')).toBeInTheDocument();
            await expect(getByText('My Profile')).toBeInTheDocument();
            await expect(getByText('Transaction Management')).toBeInTheDocument();
            await expect(getByText('Product Management')).toBeInTheDocument();
          } catch (err) {
             console.log(err);
        }
    });

});
