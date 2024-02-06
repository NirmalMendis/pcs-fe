/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import queryString from "query-string";
import useAuthStore from "../store/use-auth-store-state";
import ENV_CONFIGS from "../utils/get-env-config";

export interface GetConfig {
  path: string;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
  method?: "get" | "post" | "patch" | "delete";
  body?: object;
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

  if (config.includeAccessToken)
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

const executeRequest = async <T>({
  path,
  includeAccessToken,
  queryParams,
  signal,
  method,
  body,
}: GetConfig): Promise<T> => {
  return axiosInstance.request({
    method: method,
    url: generateURL(path, queryParams),
    data: body,
    signal,
    validateStatus: null,
    includeAccessToken,
  });
};

const getRequest = async <T>({
  path,
  includeAccessToken = true,
  queryParams,
  signal,
}: GetConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "get",
  });
};

const postRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "post",
    body,
  });
};

const patchRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "patch",
    body,
  });
};

const deleteRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
}: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "delete",
    body,
  });
};

export const apiService = {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
};
