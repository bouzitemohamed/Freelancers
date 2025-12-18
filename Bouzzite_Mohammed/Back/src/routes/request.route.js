const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const {
    getRequestsForOwner,
   createRequest,
   approveRequest
} = require("../controller/request.controller");

// All routes require authentication
router.use(authenticate);
router.get("/",getRequestsForOwner);
router.post("/",createRequest);
router.patch("/:id",approveRequest);

module.exports = router;
