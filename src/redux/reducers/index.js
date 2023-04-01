// import localStorage from "localStorage";

// const initState={
//     countryList:JSON.parse(localStorage.getItem("learningList"))?JSON.parse(localStorage.getItem("learningList")).countryList:[],
//     totalNumber:JSON.parse(localStorage.getItem("learningList"))?JSON.parse(localStorage.getItem("learningList")).countryList.length:0,
// }
import products from './products';
import { combineReducers } from 'redux'
const reducer = combineReducers({
    products
  })
  
  export default reducer
