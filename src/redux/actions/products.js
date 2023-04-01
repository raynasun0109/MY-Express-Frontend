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