const API_URL = "http://37.252.17.105/api";
export const IMAGE_URL = "http://37.252.17.105";

export const addLocation = async (location) => {
  const response = await fetch(`${API_URL}/data/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(location),
  });
  return response.json();
};

export const getLocations = async () => {
  const response = await fetch(`${API_URL}/data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.json();
};

export const getLocation = async (name) => {
  const response = await fetch(`${API_URL}/data/location`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const updateLocation = async (name, file) => {
  console.log(file, name);
  const formData = new FormData();
  formData.append("name", name);
  if (file) {
    formData.append("image", file);
  }

  console.log(formData);

  const response = await fetch(`${API_URL}/data/location`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: formData,
  });

  return response.json();
};

export const rateLocation = async (name, stars) => {
  console.log(name, stars);
  const response = await fetch(`${API_URL}/data/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ stars }),
  });
  return response.json();
};

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getUserByToken = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Auth token is not defined");
    return;
  }
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const updateDescription = async (name, description) => {
  const response = await fetch(`${API_URL}/data/description`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({ name, description }),
  });
  return response.json();
};
export const getLocationById = async (id) => {
  const response = await fetch(`${API_URL}/data/location/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.json();
};
