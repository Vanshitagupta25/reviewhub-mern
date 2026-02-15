import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
//company
export const getCompanies = (params) =>
  API.get("/companies", { params });

export const addCompany = (data) =>
  API.post("/companies", data);

export const getSingleCompany = (id) => API.get(`/companies/${id}`);

//review
export const addReview = (companyId, data) =>
  API.post(`/reviews/${companyId}`, data);

export const getReviews = (companyId) =>
  API.get(`/reviews/${companyId}`);

export const likeReview = (reviewId) =>
  API.get(`/reviews/like/${reviewId}`);


export default API;
