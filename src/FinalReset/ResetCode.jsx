import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetCode() {
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState("");
  const [Loading, setLoading] = useState(true);

  async function sendDataToBackend(values) {
    setLoading(false);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.resetCode.toString() }
      );
      console.log(data.status);
      setLoading(true);
      if (data.status === "Success") {
        navigate("/NewPassword");
      }
    } catch (err) {
      console.log(err.response.data.message);
      seterrorMsg(err.response.data.message);
      setLoading(true);
    }
  }

  let login = useFormik({
    initialValues: {
        resetCode: "",
    },
    onSubmit: (values) => {
      sendDataToBackend(values);
    },
  });

  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Enter The Code You've Recivied.</h2>
        <form onSubmit={login.handleSubmit}>
          <label htmlFor="resetCode">Code:</label>
          <input
            type="text"
            className="form-control mb-3 "
            name="resetCode"
            id="resetCode"
            onChange={login.handleChange}
            onBlur={login.handleBlur}
          ></input>
          
          
          <button
            disabled={!(login.dirty && login.isValid)}
            type="submit"
            className="btn bg-main text-white "
          >
            {Loading ? "Verify" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
