import Cookies from 'universal-cookie';
import {retrieve_shopping_cart,calculate_shopping_cart_number} from '../../utils/functions';
import {fetchOneShoppingCart,updateOneShoppingCart} from '../../service/UserService';

const cookies = new Cookies();
const initState={
    // totalNumber:0,
    totalNumber:cookies.get('myShopaholic')?calculate_shopping_cart_number(JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart))):0,
    shoppingCart:cookies.get('myShopaholic')?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)):[]
    // shoppingCart:[],
}
function fetchShoppingCart(){
    console.log('fetchShoppingCart')
    if (cookies.get('myShopaholic')){
      const uuid=cookies.get('myShopaholic').uuid;
      fetchOneShoppingCart({uuid}).then(res => {
        if(res.status==200){
            // console.log('fetchOneShoppingCart suc')

            initState.shoppingCart=JSON.parse(res.data[0].shopping_cart)
            calculateShoppingCartNumber(JSON.parse(res.data[0].shopping_cart))
        } else{
            // console.log('fetchOneShoppingCart failed')

            initState.shoppingCart=[];
            initState.totalNumber=0;
        
            return cookies.get('myShopaholic')?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)):[]

            // return []
        }
      })
    }
    // else{
    //     console.log('no cookie failed')
    //     return []
    //     initState.shoppingCart=[]
    // }
    return []
}
function calculateShoppingCartNumber(item){
    // console.log('calculateShoppingCartNumber',item)
    initState.totalNumber=calculate_shopping_cart_number(item)
    // console.log('initState.shoppingCart',initState.totalNumber)
}

function updateShoppingCart(item){
    const data={
        shopping_cart:JSON.stringify(item.shopping_cart),
        uuid:item.uuid
    }
    console.log('item',item,data)
    updateOneShoppingCart(data).then(res => {
        if(res.status==200){
            // console.log('resshoppingCart',res)
            initState.shoppingCart=item.shoppingCart;
            initState.totalNumber=calculate_shopping_cart_number(item.shopping_cart)
            const oldCookie=cookies.get('myShopaholic');
            oldCookie.shopping_cart=JSON.stringify(item.shopping_cart);
           // here
            cookies.set('myShopaholic',JSON.stringify(oldCookie),{
                maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
             })
            // fetchShoppingCart()
            // calculateShoppingCartNumber()
            // initState.shoppingCart=JSON.parse(res.data[0].shopping_cart)
            // initState.totalNumber=calculate_shopping_cart_number(JSON.parse(res.data[0].shopping_cart))
        } else{
            // initState.shoppingCart=[];
            // initState.totalNumber=0;
            // return []
        }
      })
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
        case "logoutShoppingCart":
                cookies.remove('myShopaholic');
                return Object.assign({},state,{
                    shoppingCart:[],
                    totalNumber:0,
                })
        case "cleanShoppingCart":
                return Object.assign({},state,{
                    shoppingCart:action.data.shoppingCart,
                    totalNumber:calculate_shopping_cart_number(action.data.shoppingCart)
                })
        case "getShoppingCart":
            // fetchShoppingCart();
            if (cookies.get('myShopaholic')){
                const uuid=cookies.get('myShopaholic').uuid;
                fetchOneShoppingCart({uuid}).then(res => {
                  if(res.status==200){
                      // console.log('fetchOneShoppingCart suc')
          
                      initState.shoppingCart=JSON.parse(res.data[0].shopping_cart)
                      calculateShoppingCartNumber(JSON.parse(res.data[0].shopping_cart))
                  } else{
                      // console.log('fetchOneShoppingCart failed')
          
                      initState.shoppingCart=[];
                      initState.totalNumber=0;
                  
                      return cookies.get('myShopaholic')?JSON.parse(retrieve_shopping_cart(cookies.get('myShopaholic').shopping_cart)):[]
          
                      // return []
                  }
                })
              }
            console.log("state",state,action);
            return Object.assign({},state,{
                totalNumber:state.totalNumber,
            })

        case "updateShoppingCart":
            updateShoppingCart(action.data)
            console.log("updateShoppingCart",state,action);
            return Object.assign({},state,{
                shoppingCart:action.data.shopping_cart,
                totalNumber:calculate_shopping_cart_number(action.data.shopping_cart)
            })
        
        case "refreshShoppingCart":
                // updateShoppingCart(action.data)
                    // console.log("updateShoppingCart",state,action);
                    // console.log('refreshShoppingCart',action,cookies.get('myShopaholic'))
                return Object.assign({},state,{
                    totalNumber:calculate_shopping_cart_number(JSON.parse(action.data.shopping_cart)),
                    shoppingCart:JSON.parse(action.data.shopping_cart)
                })

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