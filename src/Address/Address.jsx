import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { storeContext } from "../Context/storeContext";

export default function Address() {
  const navigate = useNavigate();
    const [Loading, setLoading] = useState(true);
    let { Pay } = useContext(storeContext)
    let { id } = useParams()

    async function payOnline(values) {
        setLoading(false)
        let data = await Pay (id,values)
        console.log(data)
        if (data.status == "success") {
            window.location.href=data.session.url
        }
    }
    


  let address = useFormik({
    initialValues: {
      details: "",
         phone: "",
        city:"",

    },
    onSubmit: (values) => {
      payOnline(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Register Now:</h2>
        <form onSubmit={address.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <textarea
            type="text"
            className="form-control mb-3 "
            name="details"
            id="details"
            onChange={address.handleChange}
            onBlur={address.handleBlur}
          ></textarea>
        
          <label htmlFor="Phone">Phone:</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="form-control mb-3"
            onChange={address.handleChange}
            onBlur={address.handleBlur}
          />
                   <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control mb-3"
            onChange={address.handleChange}
            onBlur={address.handleBlur}
          />
         

         
          <button
            disabled={!(address.dirty && address.isValid)}
            type="submit"
            className="btn bg-main text-white "
          >
            {Loading ? "Pay" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
