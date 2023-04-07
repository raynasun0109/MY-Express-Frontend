export const removeProduct=(item)=>{
    return {
        type:"removeProduct",
        good:item
    }
}

export const addProduct=(item)=>{
    console.log('item',item)
    return {
        type:"addProduct",
        data:item
    }
}

export const refreshShoppingCart=(shoppingCart)=>{
    console.log('refreshShoppingCart')
    return {
        type:"refreshShoppingCart",
        data:shoppingCart
    }
}

export const logoutShoppingCart=()=>{
    // console.log('refreshShoppingCart')
    return {
        type:"logoutShoppingCart",
    }
}

export const cleanShoppingCart=(item)=>{
    console.log('cleanShoppingCart',item)
    return {
        type:"cleanShoppingCart",
        data:item
    }
}

export const getShoppingCart=(item)=>{
    console.log('getShoppingCart',item)
    return {
        type:"getShoppingCart",
        data:item
    }
}
export const updateShoppingCart=(shoppingCart,uuid)=>{
    console.log('action updateShoppingCart',shoppingCart,uuid)
    return {
        type:"updateShoppingCart",
        data:{shoppingCart,uuid}
    }
}