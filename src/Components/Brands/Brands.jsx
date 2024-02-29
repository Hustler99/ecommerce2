import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)

  async function getBrands() {
  setLoading(true)
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
setBrands(data.data)
    console.log(data.data)
    setLoading(false)
}
useEffect(() => {
getBrands()
}, [])
if(loading) return <Loading/>
return (

<>
  <div className='parent d-flex  justify-content-center mt-5 mb-5'>
    <h2 className='dude1'>All Brands.
      .</h2>
    <h4 className='dude2'> All Brands
      .</h4>
  </div>
  <div className='container my-5'>
    <div className="row gy-4">
      {brands.map((val) => (
      <div className="col-md-3 " key={val._id}>
        <div className="card hova">
          <img src={val.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text text-center">{ val.name}</p>
          </div>
        </div>

      </div>
      ))}
        
    </div>
  </div>
</>
)
}