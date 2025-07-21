import { BASE_URL } from "./api";

export const getProjects = () => {
  return fetch(`${BASE_URL}/projects`, {
    method: "GET",
    credentials: "include",
  });
};
