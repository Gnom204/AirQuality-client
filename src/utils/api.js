/**
 * URL для API
 * @constant
 * @type {string}
 * @default
 */
const API_URL = "http://37.252.17.105/api";
/**
 * URL для изображений
 * @constant
 * @type {string}
 * @default
 */
export const IMAGE_URL = "http://37.252.17.105";

/**
 * Добавляет новую локацию
 * @async
 * @function
 * @param {Object} location - Объект с данными локации
 * @returns {Promise<Object>} - Объект с данными созданной локации
 */
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

/**
 * Получает список локаций
 * @async
 * @function
 * @returns {Promise<Array<Object>>} - Массив объектов с данными локаций
 */
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

/**
 * Удаляет локацию
 * @async
 * @function
 * @param {string} id - ID локации
 * @returns {Promise<Object>} - Объект с данными удаленной локации
 */
export const deleteLocation = async (id) => {
  const response = await fetch(`${API_URL}/data/location/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.json();
};

/**
 * Получает локацию по имени
 * @async
 * @function
 * @param {string} name - Имя локации
 * @returns {Promise<Object>} - Объект с данными локации
 */
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

/**
 * Обновляет локацию
 * @async
 * @function
 * @param {string} name - Имя локации
 * @param {File} [file] - Изображение локации
 * @returns {Promise<Object>} - Объект с данными обновленной локации
 */
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

/**
 * Оценивает локацию
 * @async
 * @function
 * @param {string} name - Имя локации
 * @param {number} stars - Оценка
 * @returns {Promise<Object>} - Объект с данными обновленной локации
 */
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

/**
 * Регистрирует пользователя
 * @async
 * @function
 * @param {Object} data - Объект с данными пользователя
 * @returns {Promise<Object>} - Объект с данными созданного пользователя
 */
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

/**
 * Логинит пользователя
 * @async
 * @function
 * @param {Object} data - Объект с данными пользователя
 * @returns {Promise<Object>} - Объект с данными созданного пользователя
 */
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

/**
 * Получает данные пользователя по токену
 * @async
 * @function
 * @returns {Promise<Object>} - Объект с данными пользователя
 */
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

/**
 * Обновляет описание локации
 * @async
 * @function
 * @param {string} name - Имя локации
 * @param {string} description - Описание локации
 * @returns {Promise<Object>} - Объект с данными обновленной локации
 */
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

/**
 * Получает локацию по ID
 * @async
 * @function
 * @param {string} id - ID локации
 * @returns {Promise<Object>} - Объект с данными локации
 */
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
