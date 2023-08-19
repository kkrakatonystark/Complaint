import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ email: "", password: "", name: "" });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/auth/signup",
        { name: cred.name, email: cred.email, password: cred.password },
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
          if (json.role == "student") navigate("/");
          else navigate("/viewComplaints");
        }
      });
  };

  return (
    <div
      id="signup"
      className="d-flex  justify-content-center align-items-center "
    >
      <div className="d-flex justify-content-center login-section">
        <form>
          <h2 className="text-center my-4">Sign Up </h2>
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
          <label className="mx-2 d-block " htmlFor="name">
            Name{" "}
          </label>
          <input
            className="mx-2 w-100 "
            type="text"
            id="name"
            name="name"
            value={cred.name}
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
            Signup
          </button>
          <p className="mx-2">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
