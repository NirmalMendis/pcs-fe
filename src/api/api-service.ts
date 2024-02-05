/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import useAuthStore from "../store/use-auth-store-state";
import ENV_CONFIGS from "../utils/get-env-config";

export interface GetConfig {
  path: string;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
}

export interface PostPatchDeleteConfig {
  path: string;
  body?: any;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    includeAccessToken?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIGS.API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().accessToken;

  if (jwt && config.includeAccessToken)
    config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

const generateURL = (path: string, queryParams?: object): string => {
  let params = "";
  if (queryParams) params = `?${queryString.stringify(queryParams)}`;
  return path + params;
};

const getRequest = async <T>({
  path,
  includeAccessToken = true,
  queryParams,
  signal,
}: GetConfig): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    signal,
    includeAccessToken,
  };
  return axiosInstance.get(generateURL(path, queryParams), requestConfig);
};

const postRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    signal,
    includeAccessToken,
    data: body,
  };
  return axiosInstance.post(generateURL(path, queryParams), requestConfig);
};

const patchRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    signal,
    includeAccessToken,
    data: body,
  };
  return axiosInstance.patch(generateURL(path, queryParams), requestConfig);
};

const deleteRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    signal,
    includeAccessToken,
    data: body,
  };
  return axiosInstance.delete(generateURL(path, queryParams), requestConfig);
};

export const apiService = {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
};
