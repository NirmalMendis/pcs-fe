import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import STORAGE_KEYS from "../constants/auth-constants";
import User from "../shared/types/user";
import createSelectors from "./create-selectors";

export interface AuthState {
  user?: Pick<User, "id" | "email" | "firstName" | "lastName">;
  accessToken?: string;
  refreshToken?: string;
  isAuthenticed: boolean;
}

export interface ExtendedAuthState extends AuthState {
  setAuthState: (payload: AuthState) => void;
  signIn: () => void;
}

export const initialAuthState: AuthState = {
  isAuthenticed: false,
};

const useAuthStoreState = create<ExtendedAuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialAuthState,
        setAuthState: (payload: AuthState) => {
          return set(payload);
        },
        signIn: () => {
          const navigate = useNavigate();
          navigate("/register");
        },
      }),
      {
        name: STORAGE_KEYS.AUTH,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

const useAuthStore = createSelectors(useAuthStoreState);

export default useAuthStore;
