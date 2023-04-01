export const removeCountry=(item)=>{
    return {
        type:"removeCountry",
        country:item
    }
}

export const addCountry=(item)=>{
    return {
        type:"addCountry",
        country:item
    }
}