import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Navigation from '../components/Navigation/Navigation';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../redux/reducers/index';
import {MemoryRouter as Router} from 'react-router-dom';

const store = createStore(rootReducer);

describe('Navigation component', () => {
    it('renders correctly', () => {
        const {asFragment} = render(<Provider store={store}>
            <Router>
                <Navigation/>
            </Router>
        </Provider>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('opens and closes the drawer', () => {
        const {getByTestId} = render(<Provider store={store}>
            <Router>
                <Navigation/>
            </Router>
        </Provider>);
        const drawerButton = getByTestId('drawer-button');
        fireEvent.click(drawerButton);
        const drawer = getByTestId('drawer');
        expect(drawer).toHaveAttribute('aria-hidden', 'false');
    });

    it('navigates to the home page when the home button is clicked', () => {
        const {getByTestId} = render(<Provider store={store}>
            <Router>
                <Navigation/>
            </Router>
        </Provider>);
        const homeButton = getByTestId('Home-button');
        fireEvent.click(homeButton);
        expect(window.location.pathname).toBe('/');
    });
    
    it('navigates to the about us page when the about us button is clicked', () => {
        const {getByTestId} = render(<Provider store={store}>
            <Router>
                <Navigation/>
            </Router>
        </Provider>);
        const homeButton = getByTestId('About Us-button');
        fireEvent.click(homeButton);
        expect(window.location.pathname).toBe('/');
    });


    it('closes the drawer on link click', () => {
        const {getByTestId} = render(
            <Provider store={store}>
                <Router>
                    <Navigation/>
                </Router>
            </Provider>
        );
        const drawerButton = getByTestId('drawer-button');
        fireEvent.click(drawerButton);
        const linkElement = getByTestId('Home-button');
        fireEvent.click(linkElement);
        const drawer = getByTestId('drawer');
        expect(drawer).toHaveAttribute('aria-hidden', 'false');
    });


});

