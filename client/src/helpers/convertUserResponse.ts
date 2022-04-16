import { User } from "../types/User";

export const convertAuthResponse = (responseData: any) => {
  const {
    email,
    country,
    fullName,
    hasNuclearBomb,
    accessToken: token,
    createdAt,
  } = responseData;

  const userData: User = {
    email,
    country,
    fullName,
    hasNuclearBomb,
    token,
    createdAt,
  };

  return userData;
};
