import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CartContext = createContext();
let headers ={
    token:localStorage.getItem('userToken')
}

function addToCart(Id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:Id},{headers:headers}).then((response)=>response).catch((error)=>console.log(error))
}
function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:headers}).then((res)=>res).catch((err)=>err)
}
function removeFromCart(Id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,{headers:headers}).then((res)=>res).catch((err)=>err)
}

function updateProductQuantity(Id , count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,{count:count},{headers:headers}).then((res)=>res).catch((err)=>err)
}
function onlinePayment(cartId,url,values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress:values},{headers:headers}).then((res)=>res).catch((err)=>err)
}
function cashPayment(cartId,values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{ shippingAddress:values},{headers:headers}).then((res)=>res).catch((err)=>err)
}


export default function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null)
    async function getCartId() {
        let {data} = await getLoggedUserCart()
        setCartId(data?.data._id);
    }
    useEffect(()=>{
        getCartId()
    },[])
    
    return <CartContext.Provider value={{cartId,addToCart,getLoggedUserCart,removeFromCart,updateProductQuantity,onlinePayment,cashPayment}}>
        {props.children}
    </CartContext.Provider>
}