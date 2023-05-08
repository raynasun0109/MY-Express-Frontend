import React from 'react';
import {render, screen, fireEvent, waitFor, prettyDOM} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import UserLayout from '../pages/Users/UserLayout/UserLayout';
import UserDashboard from '../pages/Users/UserDashboard/UserDashboard';
jest.useFakeTimers('modern');

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


describe('User Layout component', () => {
    const originalScrollTo = window.scrollTo;
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });


    afterEach(() => {
        window.scrollTo = originalScrollTo;

        jest.clearAllMocks();
    });

    const renderUserLayoutWithRouter = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/user/test-uuid/dashboard']}>
                    <Routes>
                        <Route path="/dashboard/user/:uuid/:tab" element={<UserLayout/>}>
                            <Route path="dashboard" element={<UserDashboard/>}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
    };

    it('renders the component correctly', async () => {
        const {getByText} = renderUserLayoutWithRouter();

        try {
           await expect(screen.getByText('My Orders')).toBeInTheDocument();
           await expect(screen.getByDisplayValue('Customer Service')).toBeInTheDocument();
           await expect(screen.getByDisplayValue('My Data')).toBeInTheDocument();
          } catch (err) {
             console.log(err);
        }
    });
})