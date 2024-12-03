import axios from 'axios';

const API_KEY = 'dde87674464a0294ce5c6c7abb9c655d'; // ImgBB

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function uploadImageToImgBB(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrl = response.data.data.url; 
    return imageUrl;
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    throw error;
  }
}

export async function fetchBooks() {
  try {
    const response = await apiClient.get('/books');
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    throw error;
  }
}

export async function addBook(book) {
  try {
    const response = await apiClient.post('/add-books', book);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    throw error;
  }
}

export async function updateBook(id, book) {
  try {
    const response = await apiClient.put(`/update-book/${id}`, book);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    const response = await apiClient.delete(`/delete-book/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    throw error;
  }
}

export async function fetchBooksToIdOwner(idUser) {
  try {
    const response = await apiClient.post('/books', {
      idUser: idUser,
    });
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

export async function registerUser(email_, password_, name_, avatar_id_) {
  try {
    const response = await apiClient.post('/signup', {
      email: email_,
      password: password_,
      name: name_,
      avatar_id: avatar_id_
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
} 

export async function sendMessage(id_messager, id_sender, text) {
  try {
    const response = await apiClient.post('/add-message', {
      id_messager: id_messager,
      id_sender: id_sender,
      text: text
    });
    
    return response.data;
  }catch (error) {
    console.error(error);
  }
}

export async function addMessager(id_owner, id_user) {
  try {
    const response = await apiClient.post('/add-messager', {
      id_owner: id_owner,
      id_buyer: id_user,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}