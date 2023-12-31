import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

function Login({ showSignUp, showForgot }) {
  const [userData, setUserData] = useContext(UserContext);
  const axios = Axios();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email: form.email,
        password: form.password,
      });

      setUserData({
        token: response.data.token,
        user: response.data.user,
      });

      localStorage.setItem("auth-token", response.data.token);
      navigate("/");
    } catch (err) {
      console.log("error: ", err.response.data.msg);
      alert("Error:", err.response.data.msg);
    }
  };
  return (
    <div className="authfy-panel panel-login text-center active">
      <div className="authfy-heading">
        <h3 className="auth-title">Login to your account</h3>
        <p>
          {"Don’t have an account? "}
          <a
            className="lnk-toggler"
            data-panel=".panel-signup"
            href="#"
            onClick={showSignUp}
          >
            Create a new account
          </a>
        </p>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <div className="ajax-return-login"></div>
          <form
            name="loginForm"
            className="loginForm"
            href="/"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="form-group wrap-input">
              <input
                type="email"
                className="form-control eva_email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
              />
              <span className="focus-input"></span>
            </div>
            <div className="form-group wrap-input">
              <div className="pwdMask">
                <input
                  type="password"
                  className="form-control eva_password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span className="focus-input"></span>
                <span className="fa fa-eye-slash pwd-toggle"></span>
              </div>
            </div>
            <div className="row remember-row">
              <div className="col-xs-6 col-sm-6"></div>
              <div className="col-xs-6 col-sm-6">
                <p className="forgotPwd">
                  <a
                    className="lnk-toggler"
                    data-panel=".panel-forgot"
                    href="#"
                    onClick={showForgot}
                  >
                    Forgot password?
                  </a>
                </p>
              </div>
            </div>

            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
