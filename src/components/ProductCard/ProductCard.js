import * as React from 'react';
import './ProductCard.scss';

export default function ProductCard(prop){
    const product = prop.prop;



    return (
        <div className="product_card_container" data-testid='product_card'>
            <img src={product.image}/>
            <div className="product_name">
                {product.name}
            </div>
            <div className="product_price">
                ${product.price}
            </div>
        </div>
    )

}