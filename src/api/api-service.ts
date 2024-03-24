/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ResponseType } from "axios";
import queryString from "query-string";
import { AUTH_API } from "../constants/api-endpoints";
import { HTTP_STATUS_CODES } from "../constants/generic-constants";
import useAuthStore, { initialAuthState } from "../store/use-auth-store-state";
import ENV_CONFIGS from "../utils/get-env-config";

export interface GetConfig {
  path: string;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
  method?: "get" | "post" | "patch" | "delete";
  body?: object;
  responseType?: ResponseType;
}

export interface PostPatchDeleteConfig {
  path: string;
  body?: any;
  queryParams?: object;
  includeAccessToken?: boolean;
  signal?: AbortSignal;
  responseType?: ResponseType;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    includeAccessToken?: boolean;
  }
}

let isRefreshing = false;
const excludedEndpoints = [AUTH_API.LOGIN];
const refreshSubscribers: ((token: string) => void)[] = [];

export const axiosInstance = axios.create({
  baseURL: ENV_CONFIGS.API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().accessToken;

  if (config.includeAccessToken && config.headers)
    config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.data) return response.data.data;
    else if (response.headers["content-type"] === "application/pdf") {
      return response.data;
    }
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === HTTP_STATUS_CODES.UNAUTHORIZED &&
      !excludedEndpoints.some(
        (endpoint) => originalRequest.url?.startsWith(endpoint)
      )
    ) {
      try {
        const retryOrigReq = new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            axios(originalRequest)
              .then((response) => {
                if (response.data.data) resolve(response.data.data);
                else if (
                  response.headers["content-type"] === "application/pdf"
                ) {
                  return resolve(response.data);
                }
              })
              .catch((error) => reject(error));
          });
        });
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshResponse = await axios({
              url: AUTH_API.REFRESH,
              baseURL: ENV_CONFIGS.API_BASE_URL,
              withCredentials: true,
            });
            useAuthStore.setState({
              accessToken: refreshResponse.data.data.accessToken,
            });
            onRefreshed(refreshResponse.data.data.accessToken);
          } catch (error) {
            useAuthStore.setState(initialAuthState);
          }
          isRefreshing = false;
        }
        return retryOrigReq;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

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
  responseType,
}: GetConfig): Promise<T> => {
  return axiosInstance.request({
    method: method,
    url: generateURL(path, queryParams),
    data: body,
    signal,
    includeAccessToken,
    responseType: responseType,
  });
};

const getRequest = async <T>({
  path,
  includeAccessToken = true,
  queryParams,
  signal,
  responseType,
}: GetConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "get",
    responseType,
  });
};

const postRequest = async <T>({
  path,
  body,
  includeAccessToken = true,
  queryParams,
  signal,
  responseType,
}: PostPatchDeleteConfig): Promise<T> => {
  return executeRequest({
    path,
    includeAccessToken,
    queryParams,
    signal,
    method: "post",
    body,
    responseType,
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
