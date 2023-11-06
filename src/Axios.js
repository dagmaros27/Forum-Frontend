import axios from "axios";

const Axios = () => {
  return axios.create({
    baseURL: process.env.BASE_URL,
  });
};

export default Axios;
