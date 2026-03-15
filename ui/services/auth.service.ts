import axios from "../utils/axios-client";

class AuthService {
  static async signUp(signUpData: any) {
    const url = "/auth/signup";

    const response = await axios.post(url, signUpData);
    const { data } = response;
    return data;
  }

  static async signIn(signInData: any) {
    const url = "/auth/signin";

    const response = await axios.post(url, signInData);
    const { data } = response;
    return data;
  }
}

export default AuthService;
