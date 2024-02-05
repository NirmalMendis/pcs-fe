import usePostLogin from "../../api/auth/use-post-login";
import ROUTE_PATHS from "../../constants/route-paths";
import useAuthStore from "../../store/use-auth-store-state";
import ENV_CONFIGS from "../get-env-config";

const useAuthService = () => {
  const { mutate: mutatePostLogin, isPending: isLoading } = usePostLogin();
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const signIn = ({ email, password }: { email: string; password: string }) => {
    mutatePostLogin(
      {
        payload: {
          email,
          password,
        },
      },
      {
        onSuccess(data) {
          const { accessToken, user } = data;
          setAuthState({
            accessToken: accessToken,
            user: user,
            isAuthenticed: true,
          });
          window.location.href = `${ENV_CONFIGS.FE_BASE_URL}/${ROUTE_PATHS.REGISTER}`;
        },
      }
    );
  };

  return {
    signIn,
    isLoading,
  };
};

export default useAuthService;
