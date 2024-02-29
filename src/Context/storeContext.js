import axios from "axios";
import { createContext, useState } from "react";

export let storeContext = createContext(0);

function addToCart(productId) {
return axios
.post(
`https://ecommerce.routemisr.com/api/v1/cart/`,
{
productId: productId,
},
{
headers: {
token: localStorage.getItem("token"),
},
}
)
.then(({ data }) => data);
}
function getUserCart() {
return axios.get(`https://ecommerce.routemisr.com/api/v1/cart/`, {
headers: {
token: localStorage.getItem("token")
}
}).then(({data})=> data).catch(err=>err)
}
function deleteUserCart(productId) {
return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    headers: {
        token: localStorage.getItem("token"),
    },
    }).then(({data})=> data).catch(err=>err)
    }
    function UpdateQuantity(productId, count) {
        return axios
          .put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              count: count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          )
          .then(({ data }) => data)
          .catch((err) => err);
}


function Pay (cartId, shippingAddress) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {
        shippingAddress: shippingAddress,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
} 

function addToWishlist(productId) {
  return axios
  .post(
  `https://ecommerce.routemisr.com/api/v1/wishlist/`,
  {
  productId: productId,
  },
  {
  headers: {
  token: localStorage.getItem("token"),
  },
  }
  )
  .then(({ data }) => data);
  }
  function getUserWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
    headers: {
    token: localStorage.getItem("token")
    }
    }).then(({data})=> data).catch(err=>err)
    }
    function deleteUserWl(productId) {
      return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
          headers: {
              token: localStorage.getItem("token"),
          },
          }).then(({data})=> data).catch(err=>err)
          }

export default function StoreContextProvider({ children }) {
  const [counter, setCounter] = useState(0); 
  const [wCount, setwCounter] = useState(0);

return <storeContext.Provider value={{counter, setCounter , addToCart, getUserCart , deleteUserCart, deleteUserWl, UpdateQuantity, Pay, wCount, setwCounter, addToWishlist, getUserWishlist }}>
  {children}
</storeContext.Provider>
}