import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const ViewComplait = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    if (localStorage.getItem("role") !== "student")
      navigate("/adminviewComplaints");

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
      });
  }, []);

  return (
    <>
      <div className="baseCol body">
        <div className="card raiseCard">
          <div className="card-body">
            <div className="card-title">
              <h2 className="text-white">List of all registered complaints</h2>
            </div>
            <div className="container">
              <div className="row table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Complaint ID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Registered On</th>
                      <th scope="col">Type of Complaint</th>
                      <th scope="col">Location</th>
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
                          <td>{comp.status}</td>
                          <td>{comp.createdAt}</td>
                          <td>{comp.type}</td>
                          <td>{comp.hostel}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewComplait;
