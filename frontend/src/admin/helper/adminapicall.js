import { API } from "../../backend";

export const isAdmin = (userid, token) => {
  return fetch(`${API}user/${userid}`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      // console.log("ajeet", response.json());
      return response.json();
    })
    .then((data) => {
      return data;
    });
  // .catch((error) => {
  //   console.log("error in isAdmin");
  // })
};
