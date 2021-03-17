const userinfo = require("os").userInfo();
const questions = [
  {
    type: "input",
    name: "name",
    message: "Project Name: ",
    default: "Spin React Offline",
  },
  {
    type: "input",
    name: "version",
    message: "Project Version:",
    default: "1.0.0",
  },
  {
    type: "input",
    name: "author",
    message: "Author:",
    default: userinfo.username,
  },
  {
    type: "input",
    name: "description",
    message: "Description:",
    default: "A fine React app spun with Spin React Apps Offline",
  },
  {
    type: "input",
    name: "repository",
    message: "Remote repository url:",
    default: "",
  },
  {
    type: "checkbox",
    name: "extras",
    message: "Select an extra package(s) to install alongside:",
    choices: [
      { name: "Axios", value: "axios" },
      { name: "React Router Dom", value: "react-router-dom" },
    ],
  },
];

module.exports = questions;
