import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RaiseComplaint = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    } else if (localStorage.getItem("role") === "student") {
    } else {
      navigate("/viewComplaints");
    }
  }, []);

  const [cred, setCred] = useState({
    type: "",
    problemDetails: "",
    hostel: "",
    room: "",
    mobile: "",
    timeAvailable: "",
  });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "/complaint/addComplaint",
        {
          type: cred.type,
          status: cred.status,
          problemDetails: cred.problemDetails,
          hostel: cred.hostel,
          room: cred.room,
          mobile: cred.mobile,
          timeAvailable: cred.timeAvailable,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        }
      )
      .then((res, err) => {
        const json = res.data;
        console.log(json);
        navigate("/viewComplaints");
      });
  };

  return (
    <div className="body baseCol">
      <div className="card raiseCard">
        <div className="card-body">
          <div className="container">
            <div className="cardhead grad text-white">
              <h3>On Line Complaint Form</h3>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col-xs-12 col-sm-6 form-group">
                <label htmlFor="type">Type of Complaint</label>
                <select
                  className="form-control form-select"
                  id="type"
                  name="type"
                  value={cred.type}
                  onChange={onChange}
                >
                  <option>Select</option>
                  <option>Civil</option>
                  <option>Electrical</option>
                  <option>Mess</option>
                  <option>Internet</option>
                  <option>Sanitation</option>
                  <option>Student Contigency</option>
                </select>
              </div>
              <div className="col-xs-12 col-sm-6 form-group">
                <label htmlFor="hostel">Location</label>
                <select
                  className="form-control form-select"
                  id="hostel"
                  name="hostel"
                  value={cred.hostel}
                  onChange={onChange}
                >
                  <option>Select</option>
                  <option>Jasper</option>
                  <option>Amber</option>
                  <option>Diamond</option>
                  <option>Rosaline</option>
                  <option>Ruby</option>
                  <option>Aquamarine</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-3 RaiseComp">
            <div className="col-xs-12 col-sm-6 form-group">
              <label htmlFor="room">Room No:</label>
              <textarea
                className="form-control"
                rows={3}
                id="room"
                name="room"
                value={cred.room}
                onChange={onChange}
              />
            </div>
            <div className="col-xs-12 col-sm-6  form-group">
              <label htmlFor="problemDetails">Problem Details</label>
              <textarea
                className="form-control"
                rows={3}
                id="problemDetails"
                name="problemDetails"
                value={cred.problemDetails}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row mt-3 mb-3 RaiseComp">
            <div className="col-xs-12 col-sm-6 form-group">
              <label htmlFor="timeAvailable">Time of Availabilty</label>
              <textarea
                className="form-control"
                rows={1}
                id="timeAvailable"
                name="timeAvailable"
                value={cred.timeAvailable}
                onChange={onChange}
              />
            </div>
            <div className="col-xs-12 col-sm-6 form-group">
              <label htmlFor="mobile">Enter your Phone No:</label>
              <input
                type="tel"
                className="form-control"
                rows={1}
                id="mobile"
                name="mobile"
                value={cred.mobile}
                onChange={onChange}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="grad btn btn-primary submitbtn"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaint;
