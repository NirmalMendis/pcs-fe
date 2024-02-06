export const AUTH_ENDPOINT = "auth";
export const USER_ENPOINT = "user";

export const AUTH_API = {
  LOGIN: `${AUTH_ENDPOINT}/login`,
  LOGOUT: `${AUTH_ENDPOINT}/logout`,
};

export const USER_API = {
  LOGIN: (id: number) => `${USER_ENPOINT}/${id}`,
};
