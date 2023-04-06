import Cookies from 'universal-cookie';
import {retrieve_shopping_cart} from '../../utils/functions';

const cookies = new Cookies();

const initState={
    totalNumber:cookies.get('myShopaholic').shopping_cart?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)).length:0,
    shoppingCart:cookies.get('myShopaholic').shopping_cart?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)):[],
}

const products=(state=initState,action)=>{
    switch (action.type) {
        // case "removeCountry":
        //     const list=state.countryList;
        //     const filteredList=list.filter(function (value, index, array) {
        //         return value.name !== action.country.name;
        //     });

        //     let data={
        //         countryList:filteredList,
        //         totalNumber:filteredList.length,
        //     }

        //     const serializedState1 = JSON.stringify(data);
        //     localStorage.setItem("learningList", serializedState1)

        //     return Object.assign({},state,{
        //         countryList:filteredList,
        //         totalNumber:filteredList.length,
        //     })

        // case "addCountry":
        //     const {countryList}=state;
        //     countryList.push(action.country)
        //     let data1={
        //         countryList:state.countryList,
        //         totalNumber:state.countryList.length,
        //     }

        //     const serializedState = JSON.stringify(data1);
        //     localStorage.setItem("learningList", serializedState)
        //     return Object.assign({},state,{
        //         countryList:state.countryList,
        //         totalNumber:state.countryList.length,
        //     })
        
        case "addProduct":
            console.log("state",state,action);
            return Object.assign({},state,{
                    totalNumber:state.totalNumber,
                })
            // const {countryList}=state;
            // countryList.push(action.country)
            // let data1={
            //     countryList:state.countryList,
            //     totalNumber:state.countryList.length,
            // }

            // const serializedState = JSON.stringify(data1);
            // localStorage.setItem("learningList", serializedState)
            // return Object.assign({},state,{
            //     countryList:state.countryList,
            //     totalNumber:state.countryList.length,
            // })
        break;
        default:
            return state;
    }
}

export default products;