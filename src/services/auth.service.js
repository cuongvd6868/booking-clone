import axios from "~/configs/init.axios";

export const signUp = data => axios.post("/users", data);

export const signIn = data => axios.post("/auth/sign-in", data);

export const signOut = (data) => axios.post("/auth/logout", data);