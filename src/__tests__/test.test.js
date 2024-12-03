import { deleteBook, addBook, loginUser, apiClient } from '../apiService';

// Мокируем apiClient
jest.mock('../apiService', () => ({
  apiClient: {
    delete: jest.fn(),
    post: jest.fn(),
  },
  deleteBook: jest.fn(),
  addBook: jest.fn(),
  loginUser: jest.fn(),
}));

describe('TryToRemoveAdd', () => {
  it('успешно удаляет книгу и возвращает данные', async () => {
    // Мокаем успешный ответ для deleteBook
    apiClient.delete.mockResolvedValueOnce({ data: { success: true } });
    deleteBook.mockResolvedValue({ success: true });

    // Вызываем метод
    await deleteBook(1);

    // Проверяем, что delete был вызван
    expect(apiClient.delete).toHaveBeenCalledWith('/delete-book/1');
  });

  it('выбрасывает ошибку при неудачном удалении', async () => {
    // Мокаем ошибку
    apiClient.delete.mockRejectedValueOnce(new Error('Failed to delete'));

    // Проверяем, что ошибка выбрасывается
    await expect(deleteBook(1)).rejects.toThrow('Failed to delete');
  });
});

describe('TryToAddAd', () => {
  it('успешно добавляет книгу и возвращает данные', async () => {
    const newBook = { title: 'Test Book', author: 'Author' };
    // Мокаем успешный ответ для addBook
    apiClient.post.mockResolvedValueOnce({ data: { success: true } });
    addBook.mockResolvedValue({ success: true });

    // Вызываем метод
    await addBook(newBook);

    // Проверяем, что post был вызван с правильными аргументами
    expect(apiClient.post).toHaveBeenCalledWith('/add-books', newBook);
  });

  it('выбрасывает ошибку при неудачном добавлении', async () => {
    // Мокаем ошибку
    apiClient.post.mockRejectedValueOnce(new Error('Failed to add book'));

    // Проверяем, что ошибка выбрасывается
    await expect(addBook({ title: 'Test Book', author: 'Author' })).rejects.toThrow('Failed to add book');
  });
});

describe('TryToLogin', () => {
  it('успешно логинит пользователя и возвращает данные', async () => {
    const mockResponse = { token: 'fake-jwt-token' };
    // Мокаем успешный ответ для loginUser
    apiClient.post.mockResolvedValueOnce({ data: mockResponse });
    loginUser.mockResolvedValue(mockResponse);

    // Вызываем метод
    await loginUser('test@example.com', 'password');

    // Проверяем, что post был вызван с правильными аргументами
    expect(apiClient.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('возвращает ошибку при неправильных данных для входа', async () => {
    // Мокаем ошибку
    apiClient.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    // Проверяем, что ошибка выбрасывается
    await expect(loginUser('test@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials');
  });
});