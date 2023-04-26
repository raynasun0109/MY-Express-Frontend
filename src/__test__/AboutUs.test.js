import React from 'react';
import {render, screen,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../pages/AboutUs/AboutUs.js';
import {MemoryRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});
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
describe("renders about us page",()=>{
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();

    })
    test("render content correctly",()=>{
        render(
        <Provider store={store}>
            <MemoryRouter>
                <AboutUs/>
            </MemoryRouter>
        </Provider>);
        expect(screen.findAllByText(/About Us/i)).toBeTruthy();
        expect(screen.findAllByText(/Mingyang Sun/i)).toBeTruthy();
        expect(screen.findAllByText(/Software Engineer/i)).toBeTruthy();

    })
})