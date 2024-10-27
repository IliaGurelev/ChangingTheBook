import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchBooks() {
  try {
    const response = await apiClient.get('/books');
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    throw error;
  }
}

export async function fetchMessagers(idUser_) {
  try {
    const response = await apiClient.post('/messager', {
      id: idUser_
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных: ', error);
  }
}

export async function fetchMessages(idMessages) {
  try {
    const response = await apiClient.post('/messages', {
      id: idMessages
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных: ', error);
  }
}

export async function fetchUser(userID) {
  try {
    const response = await apiClient.post('/user', {
      id: userID
    });
    return response.data;
  }catch (error) {
    console.error('Ошибка получения данных: ', error);
  }
}

export async function loginUser(email_, password_) {
    try {
      const response = await apiClient.post('/login', {
      email: email_,
      password: password_
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
} 