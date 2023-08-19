import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const handleToggle = () => {
    if (
      document.getElementById("collapsibleNavbar").style.display === "block"
    ) {
      document.getElementById("collapsibleNavbar").style.display = "none";
    } else {
      document.getElementById("collapsibleNavbar").style.display = "block";
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
    window.reload();
  };
  return (
    <nav className="navbar navbar-expand-sm grad navbar-dark fixed-top">
      <div className=" container-fluid">
        <Link className="navbar-brand" to="/">
          {/* Complaint Center */}
          <img src="logo.png" alt="logo" width={50} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          // data-bs-toggle="collapse"
          // data-bs-target="#collapsibleNavbar"
          // aria-expanded="false"
          // aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse  navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <hr className=" d-block d-sm-none text-white hrSmall"></hr>

            <li className="nav-item">
              <Link className="nav-link" to="/addComplaints">
                Raise Complaint
              </Link>
            </li>
            <hr className=" d-block d-sm-none text-white hrSmall"></hr>
            <li className="nav-item">
              <Link className="nav-link" to="/viewComplaints">
                View Complaint
              </Link>
            </li>
            <hr className=" d-block d-sm-none text-white hrSmall"></hr>
            <li className="nav-item loginbtn">
              {!localStorage.getItem("authToken") && (
                <Link className="nav-link" to="#">
                  {/* <i className="fa fa-sign-in" aria-hidden="true" /> */}
                  Login
                </Link>
              )}
              {localStorage.getItem("authToken") && (
                <Link className="nav-link" to="#" onClick={handleClick}>
                  {/* <i className="fa fa-sign-in" aria-hidden="true" />  */}
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
