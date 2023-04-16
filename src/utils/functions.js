import {getOneTranscationFromOneOrder} from '../service/TransactionService';
import moment from "moment";

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
 * Calculate the total money from array
 */
export function calculate_shopping_cart(list){
    let total = 0;
   

    list.forEach((item) => {
        total+=Number(item.price)*Number(item.qty)
       
    });
    return total
}

/**
 * Calculate the total number from array
 */
export function calculate_shopping_cart_number(list){

    if(list){
        let total = 0;
        list.forEach((item) => {
            total+=Number(item.qty)
        });
        return total
    } else{
        return 0
    }
}

/**
 * sort product list to the format to write into transaction database
 */
export function formatted_productlist_to_tran_database(list){   
    const newMap=new Map();
    list.forEach((listItem) => {
        // console.log(listItem.merchant_uuid)
        if(newMap.has(listItem.merchant_uuid)){
            // console.log('get',newMap.get(listItem.merchant_uuid))
            newMap.set(listItem.merchant_uuid,[...newMap.get(listItem.merchant_uuid),listItem])
            
        } else{
            // console.log('has',newMap.has(`${listItem.merchant_uuid}`))

            newMap.set(listItem.merchant_uuid,[listItem])
        }

       
    });
    return newMap
}

/**
 * sort order list to the format to show in frontend
 */
export function formatted_orderlist_to_user_dashboard(list){   

    list.forEach((listItem) => {
        listItem.transactionList=[];

        splitTransactionStringArray(listItem.transaction_uuids).map((itemUuid)=>{
            getOneTranscationFromOneOrder({uuid:itemUuid}).then(res => {
                listItem.transactionList.push(res.data[0])
            })
        })

    });
    return list
}
/**
 * Transfer string from shopping cart to Array
 */
export function retrieve_shopping_cart(data){
    // console.log('fun',data)
    if (data&&data.length>2){
        // console.log('111')
        // const data_string=JSON.stringify(data.slice(1,data.length-1));
        const data_string=JSON.stringify(data);
        const formattedData=JSON.parse(data_string)
        // console.log("data_string",formattedData)
        return formattedData;
    } else{
        // console.log('22')
        return '[]'
    }
}

/**
 * check whether there is exist product in the shopping cart before added
 */
export function update_shopping_cart(product,list){
    // console.log('list',list[0].uuid==product.uuid)
    const checkExist = list.findIndex(item=>item.uuid==product.uuid);

    // console.log('product',product,list)

    if(checkExist!==-1){
        list[checkExist].qty=JSON.stringify(Number(list[checkExist].qty)+Number(product.qty));
    } else{
        product.qty=JSON.stringify(product.qty)
        list.push(product)
    }
    // console.log('list',list)

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

/**
 * Transfer string from Transaction Array
 */
export function splitTransactionStringArray(stringTransaction){
    const checkComma=stringTransaction.includes(',');
    if (checkComma){
        let transactionArray=stringTransaction.split(',');
        // console.log(transactionArray)
        return transactionArray;
    } else{
        let transactionArray=[];
        transactionArray.push(stringTransaction);
        // console.log(transactionArray)

        return transactionArray;
    }

}

/**
 * Sorted Transaction Array
 */
export function sortTransactionArray(list){
    list.sort((a, b) => a.created_at - b.reated_at);

    const newMap=new Map();
    list.forEach((listItem) => {
        if(newMap.has(listItem.order_uuid)){
            newMap.set(listItem.order_uuid,[...newMap.get(listItem.order_uuid),listItem])
            
        } else{
            newMap.set(listItem.order_uuid,[listItem])
        }

       
    });
    // return newMap

    const newList=[];
    newMap.forEach(function(value,key){
        newList.push(value)

    })

    return newList;
}

/**
 * Sorted Transaction data for dashboard
 */
export function sortTransactionData(list){
    list.sort((a, b) => a.created_at - b.reated_at);
    list.forEach((listItem) => {
        listItem.date=moment(JSON.parse(listItem.created_at)).format('YYYY-MM-DD HH:mm')
        listItem.spent=JSON.parse(listItem.product_content)[0].qty*JSON.parse(listItem.product_content)[0].price
    })
    return list;
}