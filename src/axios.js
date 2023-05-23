import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommern-api-l7hf.onrender.com",
});

export default instance;
