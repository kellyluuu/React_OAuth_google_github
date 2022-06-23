const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000/";



/* ------------------------- Redirect login success ------------------------- */

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

/* ------------------------- redirect login failure ------------------------- */
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

/* ----------------------------- redirect logout ---------------------------- */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


/* ------------------------- redirect google sign in ------------------------ */
router.get("/google", 
passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


/* ------------------------- redirect github sign in ------------------------ */
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


/* ------------------------ redirect facebook sign in ----------------------- */
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router