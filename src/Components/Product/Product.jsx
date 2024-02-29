import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { storeContext } from '../../Context/storeContext';
import { toast } from 'react-toastify';

export default function Product({ item }) {
  let { setCounter, counter, addToCart, setwCounter, addToWishlist } = useContext(storeContext);
  const [btnLoading, setBtnLoading] = useState(true);

  async function addProductToCart(productId) {
    setBtnLoading(false);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == 'success') {
      toast.success('Product Added Sucessfully');
      setCounter(data.numOfCartItems);
      setBtnLoading(true);
    }
  }

  async function addToWish(productId) {
    let data = await addToWishlist(productId);
    console.log(data.data);
    setwCounter(data.data.length)
    if (data.status == 'success') {
      toast.success('Product Added Sucessfully To WL')
    }
  }

  return (
    <>
      <div key={item._id} className="col-md-2">
        <div className="product cursor-pointer rounded-3 p-3">
          <Link to={'/product-details/' + item._id}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main"> {item.category.name}</span>
            <h5 className="fs-6 fw-bold my-2">{item.title.split(' ').slice(0, 2).join(' ')}</h5>
            <div className="rate father d-flex justify-content-between align-items-center my-3">
              <div>{item.price} EGP</div>
              <div>
                {' '}
                <i className="fa-solid fa-star rating-color"></i> {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-between ">
            <button
              disabled={!btnLoading}
              onClick={() => addProductToCart(item._id)}
              className=" me-3 btn bg-main text-white w-100 text-center"
            >
              {btnLoading ? 'Add To Cart' : 'Adding....'} <i className="fa-solid fa-cart-shopping "></i>{' '}
            </button>
            <button onClick={() => addToWish(item._id)} className="btn bg-main text-white rounded-circle">
              {' '}
              <i className="fa-solid fa-heart text-white"></i>{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
