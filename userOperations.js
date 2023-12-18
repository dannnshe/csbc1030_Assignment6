const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

const readUsers = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("Test.................");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading users file");
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    throw new Error("Error writing to users file");
  }
};

module.exports = { readUsers, writeUsers };
