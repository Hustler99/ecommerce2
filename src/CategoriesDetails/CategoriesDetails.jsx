import React, { useEffect, useState } from 'react'
import Categories from '../Components/Categories/Categories'
import axios from 'axios'
import Loading from '../Components/Loading/Loading'

export default function CategoriesDetails() {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(false)
    async function getCat() {
    setLoading(true)
let {data} = await axios.get (`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
        setLoading(false)
    }
    async function getSubCat(x) {
        try {
            setLoading(true)
          const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${x}/subcategories`);
          setSubCategories(data.data);
            console.log(data.data);
            setLoading(false)
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      }
    
useEffect(()=>{
    getCat();
}, [])
  if (loading) return <Loading />
return (

<>
  <Categories />
  <div className='parent d-flex  justify-content-center'>
    <h2 className='dude1'>Categories in Detail.</h2>
    <h4 className='dude2'>Categories in Detail.</h4>
  </div>
  <div className="container mb-3">
    <div className="row gy-4">
      {categories.map((category) => (
      <div onClick={()=>{getSubCat(category._id)}} className="col-md-4" key={category._id}>
        <div className="card  hover1">
          <div className='over'>
            <img src={category.image} className=" w-100" height={"390px"} alt="..." />

          </div>
          <div className="card-body">
            <h3 className="card-text text-cente ">{category.name}</h3>
          </div>
        </div>
      </div>
      ))}

    </div>
  </div>
  <div className='parent d-flex  justify-content-center mt-5 mb-5'>
    <h2 className='dude1'> Subcategories
      .</h2>
    <h4 className='dude2'>  Subcategories
      .</h4>
        </div>
        <div className="container mb-5">
            <div className="row">
            {subcategories.map((val) => (
  <div className="col-md-4 " key={val._id}>
    <h4 className='border text-center p-3 hova'>{val.name}</h4>
  </div>
))}

            </div>
        </div>
</>
)
}