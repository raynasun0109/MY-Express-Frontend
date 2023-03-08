import { render, waitFor, screen } from '@testing-library/react';
import axios from '../../node_modules/axios';
import ProductCard from '../components/ProductCard/ProductCard.js';
jest.mock("axios");

const dummyProduct = [
    {
        uuid:'123456',
        name:'Boxing gloves',
        price:'10',
        description:'another product',
        image:'https://res.cloudinary.com/raynasun0109/image/upload/v1677075804/myshopaholic/products/Adidas-Hybrid-100-Boxing-Gloves-RED_rotsph.jpg'
    }
]

test("Product card", async () => {
    render(<ProductCard prop={axios.get.mockResolvedValue({ data: dummyProduct })}/>);

    const productCard = await waitFor(() => screen.findAllByTestId("product_card"));

    expect(productCard).toHaveLength(1);
});