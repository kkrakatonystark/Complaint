const router = require("express").Router();
const User = require("../modals/User");
const Complaint = require("../modals/Complaint");
const jwt = require("jsonwebtoken");
const fetchStudent = require("../middleware/fetchstudent");

router.post("/addComplaint", fetchStudent, async (req, res) => {
  try {
    const complain = req.body;
    console.log(complain);
    complain.studentId = req.user;
    complain.name = req.name;
    complain.givenTo = "officer1";

    const create = await new Complaint(complain);
    const saved = await create.save();
    console.log(complain);
    return res.json({ complain: saved });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/complains", fetchStudent, async (req, res) => {
  try {
    if (req.role == "student") {
      const complains = await Complaint.find({ studentId: req.user });

      return res.json(complains);
    }

    const complains = await Complaint.find({ givenTo: req.role });
    return res.json(complains);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/complain/:id", fetchStudent, async (req, res) => {
  try {
    console.log(req.params.id);
    const complains = await Complaint.find({ _id: req.params.id });
    console.log(complains);
    return res.json(complains);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/updateComplaint/:id/:type", fetchStudent, async (req, res) => {
  try {
    console.log(req.params.id);
    if (req.role === "student")
      return res
        .status(401)
        .json({ error: "Authenticate with valid admin id" });

    const type = req.params.type;
    const id = req.params.id;
    if (type == "accept") {
      const upda = await Complaint.findByIdAndUpdate(id, {
        givenTo: "terminate",
        status: "accepted",
      });

      return res.json({ upda });
    }

    if (type == "reject") {
      const upda = await Complaint.findByIdAndUpdate(id, {
        givenTo: "terminate",
        status: "rejected",
      });

      return res.json({ upda });
    }

    if (req.role == "officer1") {
      const upda = await Complaint.findByIdAndUpdate(id, {
        givenTo: "officer2",
      });

      return res.json({ upda });
    }

    const upda = await Complaint.findByIdAndUpdate(id, { givenTo: "officer3" });

    return res.json({ upda });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;
