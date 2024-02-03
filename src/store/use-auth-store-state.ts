import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import STORAGE_KEYS from "../constants/auth-constants";
import createSelectors from "./create-selectors";

export interface AuthState {
  user?: {
    //Update with User type from API
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

export const initialAuthState: AuthState = {};

const useAuthStoreState = create<AuthState>()(
  devtools(
    persist(() => initialAuthState, {
      name: STORAGE_KEYS.AUTH,
    })
  )
);

const useAuthStore = createSelectors(useAuthStoreState);

export default useAuthStore;
