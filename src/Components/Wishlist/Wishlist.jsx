import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/storeContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'

export default function Wishlist() {
  let { wCount, setwCounter, getUserWishlist, deleteUserWl, addToCart, setCounter } = useContext(storeContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  async function addProductToCart(productId) {
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == 'success') {
      toast.success('Product Added Sucessfully');
      setCounter(data.numOfCartItems);
    }
  }
  async function getWL() {
    setLoading(true)
    let data = await getUserWishlist()
    console.log(data.data)
    setData(data.data)
    setLoading(false)
  }

  async function deleteItem(id) {
    setLoading(true)
    let data = await deleteUserWl(id)
    console.log(data)
    if (data.status == "success") {
      toast.error("Product Removed from Your WishList")
      console.log(data)
      setwCounter(data.data.length)
      setLoading(false)
      getWL()
    }

  }

  useEffect(() => {
    getWL()
  }, [])

  if (loading) return <Loading />
  if(data.length==0) return <h2 className='vh-100 text-main d-flex justify-content-center align-items-center fs-1'>Wishlist is empty!</h2>

  return (
    <>
      <div className='container shadow  my-3 bg-light'>
        <h2 className='text-muted pt-3 ms-3'>My Wishlist </h2>
        <div className="row">
          {data.map((val) => {
            return (
              <div className="row g-3 ms-2">
                <div className="col-md-2 ">
                  <img src={val.imageCover} width={190} height={250} alt="" />
                </div>
                <div className="col-md-10 mt-5 d-flex justify-content-between">
                  <div>
                    <h5 className='fw-bold ms-2'>{val.slug}</h5>
                    <h6 className='text-main fw-bolder ms-2'>{val.price} EGP</h6>
                    <button className='btn' onClick={() => deleteItem(val.id)}> <i className='fa-solid  fa-trash-can text-main' > </i>  <span className='text-main' > Remove</span> </button>
                  </div>
                  <div>
                    <button onClick={() => addProductToCart(val.id)}  className='btn-count btn btn-lg d-block mx-auto border' > Add to Cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
