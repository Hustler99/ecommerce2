import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
  let navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState("")
  const [Loading, setLoading] = useState(true)
  async function sendDataToBackend(values) {
  setLoading(false);
axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({ data }) => {
  console.log(data)
  setLoading(true)
  if (data.message == "success") {
    navigate("/signin")
  }
}).catch((err) => {
console.log(err.response.data.message)
  seterrorMsg(err.response.data.message);
  setLoading(true)
  
})
}
function validationSchema() {
let schema = new Yup.object({
name: Yup.string().min(2).max(20).required(),
email: Yup.string().email().required(),
password: Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
rePassword: Yup.string().oneOf([Yup.ref("password")]).required("RePassword Must match Password")
})
return schema;
}

let register = useFormik({
initialValues: {
name: "",
email: "",
password: "",
rePassword: "",
},
validationSchema
,
onSubmit: (values) => {
sendDataToBackend(values);
},
});
return (

<>
  <div className="w-75 m-auto my-4">
    <h2>Register Now:</h2>
    <form onSubmit={register.handleSubmit}>
      <label htmlFor="name">userName:</label>
      <input onChange={register.handleChange} type="text" className="form-control mb-3 " name="name" id="name" onBlur={register.handleBlur}></input>
      {register.errors.name && register.touched.name ? (
      <div className="alert alert-danger">{register.errors.name}</div>
      ) : (
      ""
      )}
      <label htmlFor="email">Email:</label>
      <input type="email" className="form-control mb-3 " name="email" id="email" onChange={register.handleChange} onBlur={register.handleBlur}></input>
      {register.errors.email && register.touched.email ? (
      <div className="alert alert-danger">{register.errors.email}</div>
      ) : (
      ""
      )}
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" className="form-control mb-3" onChange={register.handleChange} onBlur={register.handleBlur} />
      {register.errors.password && register.touched.password ? (
      <div className="alert alert-danger">{register.errors.password}</div>
      ) : (
      ""
      )}
      <label htmlFor="rePassword">Repassword:</label>
      <input type="password" name="rePassword" id="rePassword" className="form-control mb-3 " onChange={register.handleChange} onBlur={register.handleBlur} />
      {register.errors.rePassword && register.touched.rePassword ? (
      <div className="alert alert-danger ">{register.errors.rePassword}</div>
      ) : (
      ""
      )}
      {errorMsg? <div className=" alert alert-danger">{ errorMsg}</div>
      : ""}
      <button disabled={!(register.dirty && register.isValid)} type="submit" className="btn bg-main text-white ">
        {Loading? "SignUp" : <i className="fa fa-spinner fa-spin" ></i> }
      </button>
    </form>
  </div>
</>
);
}