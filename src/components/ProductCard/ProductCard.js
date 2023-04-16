import * as React from 'react';
import './ProductCard.scss';

export default function ProductCard(prop){
    const product = prop.prop;
    const path=`product/${prop.category}/${prop.uuid}`
   
    return (
        <a href={`http://${window.location.host}/${path}`}>
            <div className="product_card_container" data-testid='product_card'>
                <img src={product.image}/>
                <div className="product_name">
                    {product.name}
                </div>
                <div className="product_price">
                    ${product.price}
                </div>
            </div>
        </a>
    )

}