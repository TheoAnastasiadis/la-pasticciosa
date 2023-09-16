import express from "express";
import login from "./routes/login";
import logout from "./routes/logout";

import googleAuth from "../middleware/auth/authFunctions/google";
import facebookAuth from "../middleware/auth/authFunctions/facebook";
import localAuth from "../middleware/auth/authFunctions/local";

const router = express();

// local authentication
router.post("/login", localAuth, login);

// google authentication
router.get("/login/google", googleAuth, login);

// facebook authentication
router.get("/login/facebook", facebookAuth, login);

// log out
router.post("/logout", logout);

export default router;
