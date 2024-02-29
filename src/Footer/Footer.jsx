import React from 'react'
import img1 from "../../src/Assets/images/Visa_Logo.png"
import img2 from "../../src/Assets/images/238-2388525_download-button-transparent-clipart-app-store-download-buttons.png"



export default function Footer() {
return (

<>
  <footer className=' footer   vh-50'>
    <div className='ms-5 pt-4'>
      <p>Get the FreshCart App</p>
      <p>We will send you a link to open it on your phone to download the app</p>
      <div className='d-flex'>
        <input type="text" name="" id="" className='form-control w-75 ' placeholder='Email..' />
        <button className=' ms-3 btn bg-main text-white'>Share App Link</button>
      </div>
    </div>
    <div className='d-flex justify-content-between mt-4'>
      <div className='d-flex ms-5'>
        <p>Payment Partners</p>
        <img src={img1} alt="" height={"20px"} />
      </div>
      <div className='d-flex me-3'>
        <p className='me-3'>Get FreshCart App With..</p>
        <img src={img2} width={"70px"} height={"35px"} alt="" />
      </div>
    </div>
  </footer>
</>
)
} 