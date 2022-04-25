import axios, { AxiosResponse } from 'axios';

export const getProduct = async (id: number): Promise<AxiosResponse<Product>> =>
  axios.get<Product>(`http://localhost:5000/products/${id}`);

export const getProducts = async (): Promise<AxiosResponse<Product[]>> =>
  axios.get<Product[]>(`http://localhost:5000/products`);

export const postProduct = async (
  product: Product
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`http://localhost:5000/products`, product);

export const postMq = async (
  product: Product
): Promise<AxiosResponse<Product>> =>
  axios.post<Product>(`http://localhost:3000/api/mqhandler`, product);
