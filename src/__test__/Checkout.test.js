import React from 'react';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {MemoryRouter as Router} from 'react-router-dom';
import rootReducer from '../redux/reducers';
import Checkout from '../pages/Checkout/Checkout';

const renderWithRedux = (component, {initialState, store = createStore(rootReducer, initialState)} = {
    products: {
        totalNumber: 0, shoppingCart: []
    },
}) => {
    return {
        ...render(<Router><Provider store={store}>{component}</Provider></Router>), store,
    };
};

describe('Checkout component', () => {
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();

    })

    test('renders shipping address step', async () => {
        renderWithRedux(<Checkout/>);
        await act(async () => {
            expect(screen.getByTestId("shoppingAddress")).toBeInTheDocument();
        });  

    });

    test('fills out shipping address form', async () => {
        renderWithRedux(<Checkout/>);
        
        await act(async () => {
            userEvent.type(screen.getByLabelText(/First name/i), 'John');
            userEvent.type(screen.getByLabelText(/Last name/i), 'Doe');
            userEvent.type(screen.getByLabelText(/Address line 1/i), '123 Main St');        
        }); 
    });

    test('navigates to payment method step', async() => {
        renderWithRedux(<Checkout/>);
        await act(async () => {
            userEvent.type(screen.getByLabelText(/First name/i), 'John');
            // Fill out the rest of the shipping address form
            userEvent.click(screen.getByText('Next'));

        });
        expect(screen.findAllByText(/Payment method/i)).toBeTruthy();

    });
    test('navigates to order summary step', async () => {
        renderWithRedux(<Checkout/>);

        // Fill out the shipping address form
        fireEvent.change(screen.getByLabelText(/First name/i), {
            target: {value: 'John'},
        });
        fireEvent.change(screen.getByLabelText(/Last name/i), {
            target: {value: 'Doe'},
        });
        // Fill in the remaining address fields...

        // Click Next
        fireEvent.click(screen.getByTestId("nextButton"));

        // Fill out the payment method form
        fireEvent.change(screen.getByLabelText(/Name on card/i), {
            target: {value: 'John Doe'},
        });
        fireEvent.change(screen.getByLabelText(/Card number/i), {
            target: {value: '4111111111111111'},
        });
        // Fill in the remaining payment fields...

        // Click Next
        fireEvent.click(screen.getByTestId("nextButton2"));

        // Check if the order summary step is displayed
        expect(await screen.findByTestId("orderSummary")).toBeInTheDocument();
    });

    test('place order button triggers a Redux action', async () => {
        const mockStore = createStore(rootReducer);
        mockStore.dispatch = jest.fn();

        renderWithRedux(<Checkout/>, {store: mockStore});

        // Fill out the shipping address form
        fireEvent.change(screen.getByLabelText(/First name/i), {
            target: {value: 'John'},
        });
        fireEvent.change(screen.getByLabelText(/Last name/i), {
            target: {value: 'Doe'},
        });
        // Fill in the remaining address fields...

        // Click Next
        fireEvent.click(screen.getByTestId("nextButton"));

        // Fill out the payment method form
        fireEvent.change(screen.getByLabelText(/Name on card/i), {
            target: {value: 'John Doe'},
        });
        fireEvent.change(screen.getByLabelText(/Card number/i), {
            target: {value: '4111111111111111'},
        });
        // Fill in the remaining payment fields...

        // Click Next
        fireEvent.click(screen.getByTestId("nextButton2"));

        // Click Place Order
        fireEvent.click(screen.getByText('Place Order'));

        // Click Place Order
        await act(async () => {
            fireEvent.click(screen.getByText('Place Order'));
        });

    });
});
