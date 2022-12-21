import { User } from "firebase/auth";

export interface Auth {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
  avatarUrl?: string;
  emailVerified?: boolean;
}

const authAdapter = (user: User, token: string): Auth => {
  return {
    token,
    refreshToken: user.refreshToken,
    name: user.displayName as string,
    email: user.email as string,
    emailVerified: user.emailVerified,
    avatarUrl: user.photoURL as string,
  };
}

export default authAdapter;