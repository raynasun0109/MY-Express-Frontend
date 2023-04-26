import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers';
import Logout from '../pages/Logout/Logout';
import {MemoryRouter as Router} from "react-router-dom";

const store = createStore(rootReducer);
const history = createMemoryHistory();

describe('Logout component Render', () => {
    const originalScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalScrollTo;
        jest.clearAllMocks();
    });

    test('Renders the Logout component and performs logout', async () => {
        const {container} = render(
            <Provider store={store}>
                <Router history={history}>
                    <Logout/>
                </Router>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Logout Succsffully')).toBeInTheDocument();
            expect(screen.getByText('Now redirect to the home page')).toBeInTheDocument();
            expect(container.querySelector('.logout_loading')).toBeInTheDocument();
            expect(history.location.pathname).toBe('/');
        });
    });
});


