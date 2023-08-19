import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/auth/login",
        { email: cred.email, password: cred.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res, err) => {
        const json = res.data;
        console.log(json);

        if (json.authToken) {
          localStorage.setItem("authToken", json.authToken);
          localStorage.setItem("role", json.role);
          localStorage.setItem("name", json.name);
          console.log(json);
          // window.reload();
          navigate("/");
          // if (json.role === "student") navigate("/");
          // else {
          //   navigate("/viewComplaints");
          //   //window.reload();
          // }
        }
      });
  };
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div
        id="login"
        className="d-flex  justify-content-center align-items-center "
      >
        <div className="d-flex justify-content-center login-section">
          <form>
            <h2 className="text-center my-4">Log In </h2>
            <label className="mx-2 d-block " htmlFor="email">
              Username/Email{" "}
            </label>
            <input
              className="mx-2 w-100 "
              type="email"
              id="email"
              name="email"
              value={cred.email}
              onChange={onChange}
            />
            <label className="d-block mx-2 mt-4 " htmlFor="password">
              {" "}
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mx-2  w-100"
              value={cred.password}
              onChange={onChange}
            />
            <button
              className="d-block text-center mx-2 w-100 my-4"
              onClick={handleClick}
            >
              LOGIN
            </button>
            <p className="mx-2">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
