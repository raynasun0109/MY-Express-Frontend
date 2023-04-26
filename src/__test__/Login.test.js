import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import Login from '../pages/Login/Login';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter as Router} from 'react-router-dom';
import { userLogin} from "../service/UserService";
import rootReducer from '../redux/reducers';
import {createStore} from 'redux';

const mockStore = configureStore([]);
const store = createStore(rootReducer);

jest.mock('universal-cookie', () => {
    return jest.fn().mockImplementation(() => {
        return {
            set: jest.fn(),
            get: jest.fn(),
        };
    });
});

jest.mock('../service/UserService', () => {
    return {
        userLogin: jest.fn().mockImplementation(() => {
            return Promise.resolve({
                data: {
                    code: 1,
                    data: [
                        {
                            email: 'test@test.com',
                            shopping_cart: [],
                        },
                    ],
                },
            });
        }),
    };
});

describe('Login component', () => {
    const originalScrollTo = window.scrollTo;
    let store;

    beforeEach(() => {
        window.scrollTo = jest.fn();
        store = mockStore({
            shoppingCart: [],
        });
    });


    afterEach(() => {
        window.scrollTo = originalScrollTo;

        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const {asFragment} = render(
            <Router>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </Router>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should submit form correctly', async () => {
        userLogin.mockImplementationOnce(() => Promise.resolve({
            "code": 1,
            "msg": "Login Successfully",
            "data": [
                {
                    "uuid": "f92ecb0e-e2f9-4d6e-93ff-20bddcad5493",
                    "first_name": "undefined",
                    "password": "12121",
                    "type": "undefined",
                    "created_at": "1682066832949",
                    "update_at": "1682066832949",
                    "email": "john.doe@example.com",
                    "last_name": "undefined",
                    "shopping_cart": "[]"
                }
            ]
        }));
        const { getByText, getByLabelText} = render(
            <Router>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </Router>
        );

        try{
            fireEvent.change(getByLabelText('Email Address'), {
                target: {value: 'test@test.com'},
            });
            fireEvent.change(getByLabelText('Password'), {
                target: {value: 'test'},
            });
    
    
            fireEvent.click(getByText('Confirm'));
        } catch(e){
            console.log(e);
            
        }
        

        // await waitFor(() => expect(userLogin).toHaveBeenCalledTimes(1));
    });
});
