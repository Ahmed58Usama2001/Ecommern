import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommern-api-vxe0.onrender.com",
});

export default instance;
