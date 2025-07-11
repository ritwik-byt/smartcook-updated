export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");
export const isAdmin = () => getUserRole() === "admin";
