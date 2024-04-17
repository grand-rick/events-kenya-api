const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimter = require("express-rate-limit");
const v1EventRoutes = require("./v1/routes/eventRoutes");
const v1MemberRoutes = require("./v1/routes/memberRoutes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const limiter = rateLimter({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: "FAILED",
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(cors());
app.use("/api/v1/events", v1EventRoutes);
app.use("/api/v1/members", v1MemberRoutes);

app.get("/", (req, res) => {
  res.send("This is working!");
});

app.listen(PORT, () => {
  console.log(`The server is running on PORT: ${PORT}`);
});
