import axios from "axios";

export default axios.create({
  baseURL: "https://colorsrc.herokuapp.com/",
  // baseURL: "http://localhost:3000/",
});
