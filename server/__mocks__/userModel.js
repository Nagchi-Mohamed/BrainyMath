import { jest } from '@jest/globals';

const mockUser = {
  findById: jest.fn().mockImplementation((id) => {
    if (id === '123') {
      return Promise.resolve({
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false
      });
    }
    return Promise.resolve(null);
  }),
  select: jest.fn().mockReturnThis()
};

export default mockUser; 