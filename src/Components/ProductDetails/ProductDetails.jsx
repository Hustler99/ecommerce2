import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { storeContext } from '../../Context/storeContext'
import { toast } from 'react-toastify'

export default function ProductDetails() {
  let {setCounter, counter, addToCart} = useContext(storeContext)
  async function addProductToCart(productId) {
    let data = await addToCart(productId)
    console.log(data)
    if (data.status == "success") {
      toast.success("Product Added Sucessfully")
      setCounter(data.numOfCartItems)
    }

  }
let x = useParams()
const [ProductDet, setProductsDet] = useState({});
async function getProdDetails() {
let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
setProductsDet(data.data);
}
useEffect(() => {
getProdDetails()
}, [])

return (

<>
  <div className='container  mt-5 pt-2'>
    <div className='row'>
      <div className="col-md-3">
        <img src={ProductDet.imageCover} className='w-100 rounded-4 shadow' alt="" />
      </div>
      <div className="col-md-9 mt-5 pt-5">
        <h4>{ProductDet.title}</h4>
        <p className="text-muted">{ProductDet.description}</p>
        <p>{ProductDet.category?.name}</p>
        <div className='d-flex justify-content-between'>
          <p>{ProductDet.price} EGP</p>
          <p>{ProductDet.ratingsAverage} <i className="fa-solid fa-star rating-color"></i>
          </p>
        </div>
        <button onClick={()=>(addProductToCart(ProductDet._id))} className='btn bg-main text-white w-100 text-center' > Add To Cart <i className='fa-solid fa-cart-shopping ' ></i> </button>

      </div>
    </div>
  </div>

</>
)
}