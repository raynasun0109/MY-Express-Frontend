
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