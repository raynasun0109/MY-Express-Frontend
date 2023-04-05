
/**
 * Iterate Object to Array
 * Transfer data type from {{},{},{}} to [{},{},{}]
 */

export function object_to_array(object_array){
    const my_array=[];
    Object.keys(object_array).forEach(function(key){
        my_array.push(object_array[key])
    })
    return my_array
}

/**
 * Identify user type
 * 1=user, 2=merchant
 */
export function user_type(type){
    switch(type){
        case '1':
            return "user";
        case '2':
            return "merchant";
        default:
            return "Cannot identidy user type";
    }
        
}


/**
 * Transfer string from shopping cart to Array
 */
export function retrieve_shopping_cart(data){
    if (data.length==2){
        return []
    } else{
        // const data_string=JSON.stringify(data.slice(1,data.length-1));
        const data_string=JSON.stringify(data);
        const formattedData=JSON.parse(data_string)
        // console.log("data_string",formattedData)
        return formattedData;
    }
}

/**
 * check whether there is exist product in the shopping cart before added
 */
export function update_shopping_cart(product,list){
    // console.log('list',list[0].uuid==product.uuid)
    // const checkExist = list.includes(item=>item.uuid===product.uuid);
    const checkExist = list.findIndex(item=>item.uuid==product.uuid);

    // console.log('checkExist',checkExist)

    if(checkExist!==-1){
        list[checkExist].qty+=product.qty;
        // list.forEach((item) => {
        //     if(item.uuid==product.uuid){
        //         item.qty=JSON.stringify(product.qty+Number(item.qty))
        //     }
        //   });
    } else{
        list.push(product)
    }

    return list;
    // const new_shopping_cart = [];

    // if (list.length==0){
    //     new_shopping_cart.push(product);
    //     return new_shopping_cart;
    // } else{
    //     const checkExist = list.includes(item=>item.uuid==product.uuid);
    //     if(checkExist){
    //         list.forEach((item) => {
    //             if(item.uuid==product.uuid){
    //                 item.qty+=product.qty
    //             }
    //           });
    //     } else{
    //         list.push(product)
    //     }
       
    //     return list;
    // }
}
