import { jwtDecode } from "jwt-decode";

export const isAdminUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.isAdmin === true;
  } catch {
    return false;
  }
};
