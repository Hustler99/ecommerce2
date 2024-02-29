import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick"

export default function Categories() {
    const [categories, setCategories] = useState([])
     async function getCat (){
        let {data} =  await axios.get (`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
    }
    useEffect(()=>{
        getCat();
    }, [])
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        autoplay: true,
        dots: false,
        
    
      };
  return (
    <>
    <div className='my-2 container'>
    <h3>Show Popular Categories</h3>
                <Slider   {...settings}>
                {categories.map((item, index) => (
                  <img key={item._id} src={item.image} className="w-100" height={"250px"} />
                  

                ))}



        </Slider>
        <hr/>
      </div>
      
    </>

  )
}
