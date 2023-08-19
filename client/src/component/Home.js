import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "bootstrap";
const Home = () => {
  const navigate = useNavigate();

  const addComplaint = () => {
    console.log("hello");
    navigate("/addComplaints");
  };

  const vieComplaint = () => {
    navigate("/viewComplaints");
  };

  useEffect(() => {
    //window.reload();
    if (!localStorage.getItem("authToken")) navigate("/login");

    if (
      localStorage.getItem("authToken") &&
      localStorage.getItem("role") !== "student"
    ) {
      navigate("/viewComplaints");
    }
  }, []);

  return (
    <div className="container-fluid home">
      <div className="row">
        <div className="col-sm-8 d-none d-sm-block left">
          <img src="question2.png" alt="Question" className=" welcomeImg" />
        </div>
        <div className="col-xs-12 col-sm-4 right">
          <div className="row rightup">
            <h3 className="text-center mt-auto">
              Welcome {localStorage.getItem("name")}
            </h3>
          </div>
          <div className="row rightdown">
            <div className="d-block rightdowna">
              <button
                className="d-block text-center upbtn "
                onClick={addComplaint}
              >
                Raise Complaint
              </button>
            </div>
            <div className="d-block rightdownb">
              <button
                className="d-block text-center downbtn"
                onClick={vieComplaint}
              >
                View Comlaint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
