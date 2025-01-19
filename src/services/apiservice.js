import axios from "axios";

const API_BASE_URL = "https://bloodheroes.onrender.com"; 


export const registerDonor = async (donorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/donour/register`, donorData);
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error; 
  }
};

// Hospital API
export const registerHospital = async (hospitalData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/hospital/register`, hospitalData);
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error; 
  }
};