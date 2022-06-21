import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: { access_token: localStorage.getItem("access_token") },
});
