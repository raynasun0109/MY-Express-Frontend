import React from 'react';
import {render, screen, fireEvent, waitFor, prettyDOM} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductCategory from '../pages/ProductCategory/ProductCategory';
import {allProducts,latestProducts} from '../service/ProductService';
import Navigation from '../components/Navigation/Navigation';
import userEvent from '@testing-library/user-event';

// Mock window.location
global.window.location = {
    href: 'http://localhost:3000/product/CLOTHES',
    /*
    * Other settings
    */
    toString: () => {
        return global.window.location.href;
    },
};

// Mock the required modules
jest.mock('../service/ProductService', () => {
    return {
        allProducts: jest.fn().mockImplementation(() => {
            return Promise.resolve({
                data: {
                    code: 1,
                    data: [
                        {
                            category: "CLOTHES",
                            created_at: "1678791239666",
                            description: "a mma gloves",
                            image: "https://res.cloudinary.com/raynasun0109/image/upload/v1677075825/myshopaholic/products/images_4_rsxwh5.jpg",
                            location: "Dublin",
                            merchant_uuid: "f1981b04-1af4-4fe6-97df-ce0dad4d2308",
                            name: "mma gloves22",
                            price: "45",
                            qty: 1,
                            stock: "67",
                            update_at: "1680359596128",
                            uuid: "ddafacvsdw"
                        },
                        {
                            category: "CLOTHES",
                            created_at: "1678791239666",
                            description: "a mma gloves",
                            image: "https://res.cloudinary.com/raynasun0109/image/upload/v1677075825/myshopaholic/products/images_4_rsxwh5.jpg",
                            location: "Dublin",
                            merchant_uuid: "f1981b04-1af4-4fe6-97df-ce0dad4d2308",
                            name: "mma gloves22",
                            price: "45",
                            qty: 1,
                            stock: "67",
                            update_at: "1680359596128",
                            uuid: "ddafacjjjvsdw"
                        }
                    ],
                },
            });
        }),
    };
    

});
const mockStore = configureStore();
const store = mockStore({
    products: {
        totalNumber: 0,
        shoppingCart: []
    },
});

describe('Product Category page', () => {
    const originalScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalScrollTo;
        jest.clearAllMocks();
    });

    test("renders correctly", async ()=>{
        allProducts.mockImplementationOnce(() => Promise.resolve({
            "code": 1,
            "msg": "Fetch data Successfully",
            "data": [
                {
                    category: "CLOTHES",
                    created_at: "1678791239666",
                    description: "a mma gloves",
                    image: "https://res.cloudinary.com/raynasun0109/image/upload/v1677075825/myshopaholic/products/images_4_rsxwh5.jpg",
                    location: "Dublin",
                    merchant_uuid: "f1981b04-1af4-4fe6-97df-ce0dad4d2308",
                    name: "mma gloves22",
                    price: "45",
                    qty: 1,
                    stock: "67",
                    update_at: "1680359596128",
                    uuid: "ddafacjjjvsdw"
                },
                {
                    category: "CLOTHES",
                    created_at: "1678791239666",
                    description: "a mma gloves",
                    image: "https://res.cloudinary.com/raynasun0109/image/upload/v1677075825/myshopaholic/products/images_4_rsxwh5.jpg",
                    location: "Dublin",
                    merchant_uuid: "f1981b04-1af4-4fe6-97df-ce0dad4d2308",
                    name: "mma gloves22",
                    price: "45",
                    qty: 1,
                    stock: "67",
                    update_at: "1680359596128",
                    uuid: "ddafacjjjvsdw"
                }
            ]
        }));

        const { getByText, getByLabelText} =render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductCategory>
                        <Navigation/>
                    </ProductCategory>
                </MemoryRouter>
            </Provider>
        )
         try{
            await waitFor(() => {
            expect(screen.findAllByText(/Clothes/i)).toBeTruthy();
            expect(screen.findAllByText(/Location/i)).toBeTruthy();
            expect(screen.findAllByText(/Price/i)).toBeTruthy();
            expect(screen.findAllByText(/Sort by/i)).toBeTruthy();
            expect(screen.findAllByText(/Reset/i)).toBeTruthy();
            expect(screen.findAllByText(/mma gloves11/i)).toBeTruthy();
            expect(screen.findAllByText(/mma gloves22/i)).toBeTruthy();
        })

         } catch (err) {
            console.log(err);
        }

    })

})