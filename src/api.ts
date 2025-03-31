import axiosInstance from './axios';

interface BookSearchDataType {
  query: string;
  target: string;
  sort: string;
  page: number;
  size: number;
}

export const searchBookApi = async (oData: BookSearchDataType) => {
  try {
    const sUrl = '/book'; 
    const response = await axiosInstance.get(sUrl, { params: oData });
    return response;
  } catch (error) {
    let oErr: any = error;
    return {
      ok: false,
      msg: `[searchBookApi 도서검색 오류] ${oErr.toString()}`,
      data: undefined,
    };
  }
};