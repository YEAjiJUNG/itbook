import { ITBOOK_API_ENDPOINT } from '@/config';
import axios from 'axios';

const instance = axios.create({
  baseURL: ITBOOK_API_ENDPOINT,
  withCredentials: false,
});

export const searchBooks = {
  getBookList: ({keyword, page}: {keyword: string, page?: number}) => instance.get<any[]>(`/search/${keyword}/${page}`),
  getBookItem: (id) => instance.get(`/books/${id}`)
}