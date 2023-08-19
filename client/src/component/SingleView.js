import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const ViewComplaint = (props) => {
  const [comp, setComplaint] = useState("");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) navigate("/login");

    axios
      .get(`/complaint/complain/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        console.log(json);
        setComplaint(json[0]);
      });
  }, []);

  const handleAccept = () => {
    // console.log("Helllo workdla");
    // console.log(e.target);
    // const id = this.props.value;
    console.log("authToken");
    const type = "accept";
    axios
      .get(`/complaint/updateComplaint/${id}/${type}`, {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        navigate("/viewComplaints");
        // getdata();
      });
  };
  const handleReject = () => {
    // const id = "";
    axios
      .get(`/complaint/updateComplaint/${id}/reject`, {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        //getdata();
        navigate("/viewComplaints");
      });
  };
  const handleEscalate = () => {
    // const id = "";
    axios
      .get(`/complaint/updateComplaint/${id}/escalate`, {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        navigate("/viewComplaints");
        // getdata();
      });
  };
  return (
    <>
      <div className="baseCol body compBody">
        <div className="title compTitle">Complaint Details</div>
        <div className="card raiseCard">
          <div className="card-body">
            <div className="card-title text-white">
              <h4>Complaint ID: {comp._id}</h4>
            </div>
            <div className="container">
              <div className="row singleCont">
                <div className="viewrow viewtop col-xs-12 col-sm-4">
                  <p>Complaint By</p>
                  <p>{comp.name}</p>
                </div>
                <div className="viewrow viewtop col-xs-12 col-sm-4">
                  <p>Mobile No</p>
                  <p>9358550486</p>
                </div>
                <div className="viewrow viewtop col-xs-12 col-sm-4">
                  <p>Location</p>
                  <p>{comp.hostel}</p>
                </div>
              </div>
              <div className="row singleCont">
                <div className="viewrow col-xs-12 col-sm-6">
                  <p>Registered On</p>
                  <p>{comp.createdAt}</p>
                </div>
                <div className="viewrow col-xs-12 col-sm-6">
                  <p>Preferred Time</p>
                  <p>{comp.timeAvailable}</p>
                </div>
              </div>
              <div className="row singleCont">
                <div className="viewrow viewdown col-xs-12 col-sm-6">
                  <p>Status</p>
                  <p>{comp.status}</p>
                </div>
                <div className="viewrow viewdown col-xs-12 col-sm-6">
                  <p>Problem Details</p>
                  <p>{comp.problemDetails}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {localStorage.getItem("role") !== "student" && (
          <div className="complaintstatus container">
            <div className="row justify-content-center actionflex singleCont">
              <div
                className="col-xs-12 col-sm-4 acceptbtn hover-shadow actionbtn"
                onClick={handleAccept}
              >
                Accept
              </div>
              <div
                className="col-xs-12 col-sm-4 rejectbtn actionbtn"
                onClick={handleReject}
              >
                Reject
              </div>
              {localStorage.getItem("role") !== "officer3" && (
                <div
                  className="col-xs-12 col-sm-4 escalatebtn actionbtn"
                  onClick={handleEscalate}
                >
                  Escalate
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewComplaint;
