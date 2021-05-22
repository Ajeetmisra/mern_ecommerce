import { API } from "../../backend";

export const isAdmin = (userid, token) => {
  return (
    fetch(`${API}user/${userid}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("ajeet", response.json());
        return response.json();
      })
      // .then((data) => {
      //   return data;
      // });
      .catch((error) => {
        console.log("error in isAdmin");
      })
  );
};

// category calls
// create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}category/create/${userId}`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },

    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error in creating category", error);
    });
};

// update category
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}category/${categoryId}/${userId}`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },

    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error in Updating category", error);
    });
};
//get categories
export const getCategories = () => {
  return fetch(`${API}categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("error in getting all categories");
    });
};

// get a single category
export const getCategory = (categoryId) => {
  return fetch(`${API}category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("error in getting all categories");
    });
};

// delete a category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}category/${categoryId}/${userId}`, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error in deleting category", error);
    });
};
// peoduct calls

// create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",

      Authorization: `bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error", err));
};

// get all products
export const getProducts = () => {
  return fetch(`${API}products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("error in getting all categories");
    });
};

// get a product
export const getAproduct = (productId) => {
  return fetch(`${API}product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("error in getting all categories");
    });
};

// delete a product
export const deleteAproduct = (productId, userId, token) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error in creating category", error);
    });
};
// update a product

export const updateAproduct = (productId, userId, token, product) => {
  return fetch(`${API}product/${productId}/${userId}`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },

    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error in Updating Product", error);
    });
};
