import axiosInstance from './axios';

interface BookSearchDataType {
  query: string;
  sort: string;
  page: number;
  size: number;
}
export type BookType = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

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