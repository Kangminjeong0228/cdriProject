import axios from 'axios';

const axiosInstance: any = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`, 
  },
});

export default axiosInstance;