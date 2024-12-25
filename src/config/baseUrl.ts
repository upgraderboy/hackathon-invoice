import Axios from "axios";


const BASE_URL = "http://localhost:3001";
const Api = Axios.create({baseURL: BASE_URL, withCredentials: true});
export default Api;