import axios from "axios";

const token = localStorage.getItem("token");
const request = axios.create({
  baseURL: "https://wong801-portfolio.herokuapp.com/api",
  headers: { Authorization: "Bearer " + token },
});

export default request;
