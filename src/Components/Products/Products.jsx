import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import { useQuery } from 'react-query';

export default function Products() {


  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading, isFetching } = useQuery("getProducts", getProducts)
  // console.log(data)
  // console.log(isLoading)
  // console.log(isFetching)
  // ___________________________________________________________________________________________________________
  // const [loading, setLoading] = useState(true)
  // const [products, setProducts] = useState([])
  // async function getProducts() {
  //   let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  //   console.log(data.data)
  //   setProducts(data.data)
  //   setLoading(false)
  // }
  // useEffect(() => {
  //   getProducts()
  // }, [])
  // _______________________________________________________________________________________________________________________
  if(isLoading) return <Loading/>
  return (
    <>
      <div className="container my-5 ">
        <div className="row g-4">
          {data?.data.data.map((val) => {
            return ( <Product item={val} key={val._id} />

            );
          })}
        </div>
      </div>
    </>
  )
}

  