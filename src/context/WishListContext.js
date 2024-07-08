import axios from "axios";
import { createContext } from "react";

export const WishListContext = createContext();
const headers ={
    token:localStorage.getItem('userToken')
}

function addToWishList(Id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:Id},{headers:headers}).then((response)=>response).catch((error)=>error)
}
function removeFromWishList(Id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,{headers:headers}).then((res)=>res).catch((err)=>err)
}
function getLoggedUserWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers}).then((res)=>res).catch((err)=>err)
}

export default function WishListContextProvider (props) {
    return <WishListContext.Provider value={{addToWishList,removeFromWishList,getLoggedUserWishList}}>
        {props.children}
    </WishListContext.Provider>
}