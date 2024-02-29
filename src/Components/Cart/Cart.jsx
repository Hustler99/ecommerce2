import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/storeContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

export default function Cart() {
  const [data, setData] = useState(null)
  const [btnLoading, setBtnLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  let { getUserCart, deleteUserCart, setCounter, UpdateQuantity } = useContext(storeContext)
  useEffect(() => {
    (async() => {
      let data = await getUserCart()
      if (data?.response?.data?.statusMsg == "fail") {
        setData(null)
      }
      else {
        setData(data)
      }
      console.log(data)

      setLoading(false)



    })()
  }, [])
  async function deleteItem(id) {
    setBtnLoading(true)
    let data = await deleteUserCart(id)
    console.log(data)
    if (data.status == "success") {
      toast.error("Product Removed from Your Shopping Cart")
      setData(data)
      setCounter(data.numOfCartItems)
      setBtnLoading(false)
    }
    
  }
  async function updateQTY(id, count) {
    let  data  = await UpdateQuantity(id, count)
    console.log(data)
    setData(data)
  

    
    
  }
  if (loading) return <Loading />
  if(data==null || data.numOfCartItems==0) return <h2 className='vh-100 text-main d-flex justify-content-center align-items-center fs-1'>Cart is empty!</h2>
  
  return (
    <div className='bg-main-light container my-2 rounded-2 vh-100'   >
      <h2 className='pt-3 ps-3' >Shop Cart:</h2>
      <p className='text-main ps-3' >Total Cart Price:{data?.data.totalCartPrice} EGP</p>
      {data?.data.products.map(item => {
      return     <div key={item._id} className="row py-2 border-bottom">
        <div className="col-md-1">
        <img src={item.product.imageCover} className='w-100' alt="" />

        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
          <p className='m-1'>{item.product.title.split(" ").slice(0, 4).join(" ")}</p>
          <p className='text-main m-1'> {item.price} EGP</p>
            <button onClick={() => { deleteItem(item.product._id) }} className='btn m-0 p-0' > <i className='fa-solid  text-main fa-trash-can' ></i> {btnLoading? <i className='fa-solid fa-spinner fa-spin-pulse' ></i>  :"Remove"}</button>
         </div>
          <div>
          <button onClick={()=>(updateQTY(item.product._id, item.count+1))} className='btn brdr'>+</button>
          <span className='px-3'>{item.count }</span>
            <button disabled={item.count <= 1} onClick={() => (updateQTY(item.product._id, item.count - 1))} className='btn brdr' >-</button>
          </div>
        </div>
  
    </div>
      })}
      <Link to={`/address/${data?.data._id} ` } className='btn bg-main text-white' >Place Order</Link>
    </div>
  )
}
