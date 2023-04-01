
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
        const data_string=JSON.stringify(data.slice(1,data.length-1));
        // console.log("data_string",data_string)
        const what ='{"uuid":"f943935d-b884-45b3-9fd5-3a636a78830b","first_name":"user","password":"e10adc3949ba59abbe56e057f20f883e","type":"1","created_at":"1678879728162","update_at":"1678879728162","email":"user@test.com","last_name":"sun"},{"uuid":"f943935d-b884-45b3-9fd5-3a636a78830b","first_name":"user","password":"e10adc3949ba59abbe56e057f20f883e","type":"1","created_at":"1678879728162","update_at":"1678879728162","email":"user@test.com","last_name":"sun"}';
        // const what_t=JSON.stringify(what)
        const what_t=what;
        var jsontext = '{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}';
        // const data_string=JSON.stringify(data.slice(1,data.length-1).trim());
        // console.log(data.slice(1,data.length-1),jsontext)
        // var contact = JSON.parse(jsontext);
        // const six = JSON.parse(what);
        // const data_string=JSON.stringify(data.slice(1,data.length-1).trim());
        // console.log('data',data_string,JSON.parse(data_string))
        // console.log('data',typeof JSON.parse(data_string),contact)
        // console.log(six,contact)
        const se=data_string.split('{')
        const mix='{'+se[2]
        // console.log(data_string)
        // console.log(JSON.parse(mix))
    }
}