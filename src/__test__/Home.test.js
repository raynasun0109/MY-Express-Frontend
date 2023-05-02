import React from 'react';
import {render, screen,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home/Home.js';
import {MemoryRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {allProducts,latestProducts} from '../service/ProductService';
jest.useFakeTimers('modern');

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
jest.mock('../service/ProductService', () => {
    return {
        latestProducts: jest.fn().mockImplementation(() => {
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
describe("renders home page",()=>{
    const originalScrollTo=window.scrollTo;
    beforeEach(()=>{
        window.scrollTo=jest.fn();
    })
    afterEach(()=>{
        window.scrollTo=originalScrollTo;
        jest.clearAllMocks();

    })
    test("render content correctly",async ()=>{
        latestProducts.mockImplementationOnce(() => Promise.resolve({
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
                    uuid: "ddafacjjjvsdwss"
                }
            ]
        }));
        const { container,findAllByText } = render(
        <Provider store={store}>
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        </Provider>
        );
        try{
            await waitFor(() => {
                expect(findAllByText(/Shop By Category/i)).toBeTruthy();
                expect(findAllByText(/What's NEW/i)).toBeTruthy();
                expect(findAllByText(/SUBSCRIBE AND GET 10% OFF/i)).toBeTruthy();

                // check category render
                expect(container.getElementsByClassName("sec_content_container_block_img_test").length).toBe(15);
                // check render products
                expect(container.getElementsByClassName("products_container_container").length).toBe(2);
        })

         } catch (err) {
            console.log(err);
        }

    })
})