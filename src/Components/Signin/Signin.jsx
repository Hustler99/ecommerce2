import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signin() {
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState("");
  const [Loading, setLoading] = useState(true);

  async function sendDataToBackend(values) {
    setLoading(false);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        setLoading(true);
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        seterrorMsg(err.response.data.message);
        setLoading(true);
      });
  }

  function validationSchema() {
    let schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
    });
    return schema;
  }

  let login = useFormik({
    initialValues: {
      name: "",
      password: "",

    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToBackend(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Register Now:</h2>
        <form onSubmit={login.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control mb-3 "
            name="email"
            id="email"
            onChange={login.handleChange}
            onBlur={login.handleBlur}
          ></input>
          {login.errors.email && login.touched.email ? (
            <div className="alert alert-danger">{login.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
            onChange={login.handleChange}
            onBlur={login.handleBlur}
          />
          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : (
            ""
          )}

          {errorMsg ? (
            <div className=" alert alert-danger">{errorMsg}</div>
          ) : (
            ""
          )}
          <button
            disabled={!(login.dirty && login.isValid)}
            type="submit"
            className="btn bg-main text-white "
          >
            {Loading ? "signin" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
        <Link to={"/ResetEmail"} className="text-primary fw-semibold">Forget Your Password?</Link>
      </div>
    </>
  );
}
