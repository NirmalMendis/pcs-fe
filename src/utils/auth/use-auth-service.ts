import usePostLogin from "../../api/auth/use-post-login";
import usePostLogout from "../../api/auth/use-post-logout";
import ROUTE_PATHS from "../../constants/route-paths";
import useAuthStore, {
  initialAuthState,
} from "../../store/use-auth-store-state";
import ENV_CONFIGS from "../get-env-config";

const useAuthService = () => {
  const { mutate: mutatePostLogin, isPending: isLoadingLogin } = usePostLogin();
  const { mutate: mutatePostLogout, isPending: isLoadingLogout } =
    usePostLogout();
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const user = useAuthStore((state) => state.user);

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
          window.location.href = `${ENV_CONFIGS.FE_BASE_URL}/${ROUTE_PATHS.PAWN_TICKET}`;
        },
      }
    );
  };

  const signOut = () => {
    mutatePostLogout(
      {},
      {
        onSettled() {
          setAuthState(initialAuthState);
          window.location.href = `${ENV_CONFIGS.FE_BASE_URL}/${ROUTE_PATHS.LOGIN}`;
        },
      }
    );
  };

  const getBasicUserInfo = () => {
    return user;
  };

  return {
    signIn,
    getBasicUserInfo,
    isLoading: isLoadingLogin || isLoadingLogout,
    signOut,
  };
};

export default useAuthService;
