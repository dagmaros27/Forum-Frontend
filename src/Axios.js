import axios from "axios";

const Axios = () => {
  return axios.create({
    baseURL: "http://localhost:5050",
  });
};

export default Axios;
