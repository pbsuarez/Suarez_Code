const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const secretKey = "some-random-key";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.get("/territories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://netzwelt-devtest.azurewebsites.net/Territories/All"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    await axios
      .post(
        "https://netzwelt-devtest.azurewebsites.net/Account/SignIn",
        req.body
      )
      .then((response) => {
        if (response.status == 200) {
          const token = jwt.sign(response.data.username, secretKey);

          res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
          res.status(200).send(token);
        } else {
          res.status(403).send("Unauthorized");
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get("/protected", (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.status(200).send("Access Granted");
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
