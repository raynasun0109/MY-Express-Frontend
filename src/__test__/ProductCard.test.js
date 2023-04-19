import { render, waitFor, screen } from '@testing-library/react';
import axios from '../../node_modules/axios';
import ProductCard from '../components/ProductCard/ProductCard.js';
jest.mock("axios");

const dummyProduct = 
    {
        category:"SPORTS",
        uuid:'123456',
        name:'Boxing gloves',
        price:'10',
        description:'another product',
        image:'https://res.cloudinary.com/raynasun0109/image/upload/v1677075804/myshopaholic/products/Adidas-Hybrid-100-Boxing-Gloves-RED_rotsph.jpg'
    }

test("Render Product card component", async () => {
    render(<ProductCard category={dummyProduct.category} uuid={dummyProduct.uuid} prop={dummyProduct}/>)
    const productCard = await waitFor(() => screen.findAllByTestId("product_card"));
    const productCardName = await waitFor(() => screen.findAllByTestId("product_name"));
    const productCardPrice = await waitFor(() => screen.findAllByTestId("product_price"));

    expect(productCard).toHaveLength(1);
    expect(productCardName).toHaveLength(1);
    expect(productCardPrice).toHaveLength(1);

});