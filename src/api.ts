import axiosInstance from './axios';

export const searchBookApi = async (oData: any) => {
  try {
    const response = await axiosInstance.get('/book', {
      params:
        oData
    });
  } catch (error) {
    console.error('searchBook Error:', error);
  }
};