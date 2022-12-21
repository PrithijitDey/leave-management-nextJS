import { NextComponentType } from "next";

import Auth from "../../pages/Auth";
import { useAuth } from "../context/AuthContext";

const withAuth = (Component: NextComponentType) => {
  const _Auth = (props: any) => {
    const { isLoggedIn } = useAuth();
    // console.log(isLoggedIn);
    
    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return <Auth />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    _Auth.getInitialProps = Component.getInitialProps;
  }

  return _Auth;
};

export default withAuth;
