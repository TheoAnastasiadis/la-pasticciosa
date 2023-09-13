import express from "express";
import login from "./routes/login";
import logout from "./routes/logout";

import googleAuth from "../middleware/authFunctions/google";
import localAuth from "../middleware/authFunctions/local";

const router = express();

// local authentication
router.post("/login", localAuth, login);

// google authentication
router.get("/login/google", googleAuth, login);

// log out
router.post("/logout", logout);

export default router;