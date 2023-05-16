import axios from "axios";

const httpClient = (isAuthenticated = true) => {
  const headers: any = {};
  if (isAuthenticated) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("access-token")}`;
  }

  return axios.create({
    baseURL: "http://localhost:5069/api",
    headers,
  });
};

export default httpClient;
