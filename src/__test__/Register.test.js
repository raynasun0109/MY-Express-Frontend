import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../pages/Register/Register';
import {registerOneUser} from '../service/UserService';
import {MemoryRouter as Router} from 'react-router-dom';


// Mock the UserService API call
jest.mock('../service/UserService', () => ({
    registerOneUser: jest.fn(),
}));

// Mock the Cookies library
jest.mock('universal-cookie', () => {
    return jest.fn().mockImplementation(() => ({
        set: jest.fn(),
        get: jest.fn(),
        remove: jest.fn(),
    }));
});

describe('Register component', () => {
    const originalScrollTo = window.scrollTo;
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });


    afterEach(() => {
        window.scrollTo = originalScrollTo;

        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <Router>
                <Register/>
            </Router>);
    });

    test('submits registration form', async () => {
        registerOneUser.mockImplementationOnce(() => Promise.resolve({data: {code: 0}}));
        const {getByLabelText} =
            render(
                <Router>
                    <Register/>
                </Router>
            );

        const firstNameInput = screen.getByLabelText(/First Name/i);
        const lastNameInput = screen.getByLabelText(/Last Name/i);
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const customerRadio = screen.getByRole('radio', {name: /Customer/i});
        const submitButton = screen.getByTestId('register-button');

        await waitFor(() => {
            userEvent.type(firstNameInput, 'John');
            userEvent.type(lastNameInput, 'Doe');
            userEvent.type(emailInput, 'john.doe@example.com');
            userEvent.type(passwordInput, 'password123');
        });
        fireEvent.click(customerRadio);
        fireEvent.click(submitButton);

        // await waitFor(() => expect(registerOneUser).toHaveBeenCalledTimes(1));
    });

    test('displays error message on registration failure', async () => {
        registerOneUser.mockImplementationOnce(() => Promise.resolve({
            "code": 0,
            "msg": "Email already used",
            "data": {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "password": "12121"
            }
        }));

        const {getByLabelText, getByText, getByRole} = render(
            <Router>
                <Register/>
            </Router>
        );

        const firstNameInput = getByLabelText(/First Name/i);
        const lastNameInput = getByLabelText(/Last Name/i);
        const emailInput = getByLabelText(/Email Address/i);
        const passwordInput = getByLabelText(/Password/i);
        const customerRadio = getByRole('radio', {name: /Customer/i});
        const submitButton = screen.getByTestId('register-button');

        await waitFor(() => {
            userEvent.type(firstNameInput, 'John');
            userEvent.type(lastNameInput, 'Doe');
            userEvent.type(emailInput, 'john.doe@example.com');
            userEvent.type(passwordInput, 'password123');
        })

        fireEvent.click(customerRadio);
        fireEvent.click(submitButton);

        // await waitFor(() => expect(registerOneUser).toHaveBeenCalledTimes(1));
    });
});
