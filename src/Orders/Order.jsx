import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import Loading from '../Components/Loading/Loading'

export default function Order() {

const [loading, setLoading] = useState(false)
const [data, setData] = useState([])


async function getOrders(id) {
setLoading(true)
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
setLoading(false)
setData(data)
}

useEffect(() => {
const { id } = jwtDecode(localStorage.getItem("token"))
getOrders(id)
}, [])
if(loading) return
<Loading />
return (

<>
  {data.map((item) => (

  <div key={item.id} className='order shadow rounded p-3 my-5'>
    <hr />
    <h5>Hello <span className='fw-bolder' > { item.user.name }</span> </h5>
    <div className='d-flex align-items-center'>
      <h2 className='fw-bolder '>#{item.id}</h2>
      <h4 className='fw-bold text-primary mx-4'>Processing</h4>
    </div>
    <p>You've ordered {item.cartItems.length} items.</p>
    <div className='d-flex'>
      {item.cartItems.map((val) => {
      return <img key={val.product._id} src={val.product.imageCover} style={{ width: 150 }} className='img-thmbnail mx-3 ' alt={val.product.title} />;

      })}
    </div>
    <hr />
    <p className='fw-bold'> Total Amount: { item.totalOrderPrice } EGP</p>
  </div>
  ))}
</>
)
}