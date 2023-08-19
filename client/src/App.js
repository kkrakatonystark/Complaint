import Navbar from "./component/Navbar";
import RaiseComplaint from "./component/RaiseComplaint";
import Login from "./component/Login";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminview from "./component/AdminView";
import SingleView from "./component/SingleView";
import Signup from "./component/Signup";
import StudentView from "./component/StudentView";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Home />}></Route>

          <Route path="/addComplaints" element={<RaiseComplaint />}></Route>

          <Route path="/viewComplaints" element={<StudentView />}></Route>

          <Route
            path="/viewSingleComplaints/:id"
            element={<SingleView />}
          ></Route>

          <Route path="/adminviewComplaints" element={<Adminview />}></Route>

          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
