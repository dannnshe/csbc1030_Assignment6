const express = require("express");
const userRoutes = require("./usersRoutes");
const app = express();
const port = 5001;

app.use(express.json());
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Central Error Handling Middleware
app.use((error, req, res, next) => {
  console.error("Central Error Handler:", error.message);
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send({ error: message });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
