import axios from "axios";

const Axios = () => {
  return axios.create({
    baseURL: "https://combative-leather-jacket-pike.cyclic.app",
  });
};

export default Axios;
