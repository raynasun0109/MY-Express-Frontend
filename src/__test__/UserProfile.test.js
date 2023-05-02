import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from '../pages/Users/UserProfile/UserProfile';
import Cookies from 'universal-cookie';
import {MemoryRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from "../redux/reducers";
import {updateOneUser} from '../service/UserService';

jest.mock('../service/UserService', () => ({
    updateOneUser: jest.fn(),
    fetchShoppingCart: jest.fn().mockResolvedValue([
        {
            status: 200,
        }
    ]),
    fetchOneShoppingCart: jest.fn(),
}));
const cookies = new Cookies();
const mockCookieData = {
    uuid: '1', first_name: 'John', last_name: 'Doe', type: 'customer', email: 'john.doe@test.com', password: 'MTIzNDU2', // Base64 encoded password
};

// Set the mock cookie data before running the tests
beforeAll(() => {
    cookies.set('myShopaholic', mockCookieData);
});


function renderWithRedux(ui, {store = createStore(rootReducer)} = {}) {
    return {
        ...render(<Router><Provider store={store}>{ui}</Provider></Router>),
        store,
    };
}

describe('UserProfile', () => {
    // let store;
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
        // store = mockStore({
        //     shoppingCart: {},
        //     products: {
        //         totalNumber: 0
        //     }
        // });
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();

    })
    test('renders UserProfile component', () => {
        renderWithRedux(<UserProfile/>);

        // Check if form fields are rendered with correct values
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@test.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123456')).toBeInTheDocument(); // Decoded password

        // Check if the "Update" button is rendered
        expect(screen.getByText('Update')).toBeInTheDocument();
    });

});
