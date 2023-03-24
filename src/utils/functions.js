
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
            break;
        case '2':
            return "merchant";
            break;
        default:
            return "Cannot identidy user type";
    }
        
}