import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Adminview = () => {
  const [display, setDisplay] = useState("none");
  const [complaints, setComplaints] = useState([]);
  const [complete, setComplete] = useState([]);
  const [type, setType] = useState("Select");
  const [hostel, sethostel] = useState("Select");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) navigate("/login");

    if (localStorage.getItem("role") === "student") navigate("/viewComplaints");

    axios
      .get("/complaint/complains", {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        console.log(json);
        setComplaints(json);
        setComplete(json);
      });
  }, []);

  const getdata = () => {
    axios
      .get("/complaint/complains", {
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
        },
      })
      .then((res, err) => {
        const json = res.data;
        console.log(json);
        setComplaints(json);
        setComplete(json);
      });
  };
  const handleAccept = (id) => {
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
        getdata();
      });
  };
  const handleReject = (id) => {
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
        getdata();
      });
  };
  const handleEscalate = (id) => {
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
        getdata();
      });
  };

  useEffect(() => {
    var temp = [];
    complete.forEach((ele) => {
      if (
        (type === "Select" || type === ele.type) &&
        (hostel === "Select" || hostel === ele.hostel)
      )
        temp.push(ele);
    });

    setComplaints(temp);
  }, [type, hostel]);

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handlehostel = (e) => {
    sethostel(e.target.value);
  };

  const handleDisplay = () => {
    if (display === "none") setDisplay("block");
    else setDisplay("none");
  };
  return (
    <>
      <div className="baseCol body">
        <div className="title ">All Complaint</div>
        <button className="mx-4 filterbtn" onClick={handleDisplay}>
          Filter
        </button>
        <div className={"d-" + display}>
          <div className="mx-4 col-xs-2 col-sm-4 ">
            <label htmlFor="type" className="textBold">
              Type of Complaint:{" "}
            </label>
            <select
              className="form-control form-select d-inline filterSelect"
              id="type"
              name="type"
              value={type}
              onChange={handleType}
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
          <div className="mx-4 col-xs-2 col-sm-4 ">
            <label htmlFor="type" className="textBold">
              Location:
            </label>
            <select
              className="form-control form-select d-inline filterSelect"
              id="hostel"
              name="hostel"
              value={hostel}
              onChange={handlehostel}
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
        <div className="container admin">
          <div className="row table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th scope="col">Complaint ID</th>
                  <th scope="col">Registered On</th>
                  <th scope="col">Type of Complaint</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {complaints.map((comp) => {
                return (
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Link to={"/viewSingleComplaints/" + comp._id}>
                          {comp._id}
                        </Link>
                      </th>
                      <td>{comp.createdAt}</td>
                      <td>{comp.type}</td>
                      <td>{comp.hostel}</td>
                      <td>{comp.status}</td>
                      <td className="action">
                        <button
                          className="d-inline text-center accept "
                          name={comp._id}
                          onClick={() => handleAccept(comp._id)}
                        >
                          A
                        </button>
                        <button
                          className="d-inline text-center reject"
                          onClick={() => handleReject(comp._id)}
                        >
                          R
                        </button>
                        {localStorage.getItem("role") !== "officer3" && (
                          <button
                            className="d-inline text-center escalate"
                            onClick={() => handleEscalate(comp._id)}
                          >
                            E
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminview;
