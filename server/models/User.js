const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

class User {
  static async findById(id) {
    const users = await this.readUsers();
    return users.find(user => user.id === id);
  }

  static async findByEmail(email) {
    const users = await this.readUsers();
    return users.find(user => user.email === email);
  }

  static async findByUsername(username) {
    const users = await this.readUsers();
    return users.find(user => user.username === username);
  }

  static async create(userData) {
    const users = await this.readUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === userData.email || user.username === userData.username)) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'student',
      progress: {
        completedLessons: [],
        quizScores: []
      },
      groups: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await this.writeUsers(users);
    return newUser;
  }

  static async comparePassword(hashedPassword, candidatePassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async readUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, create it with empty array
        await this.writeUsers([]);
        return [];
      }
      throw error;
    }
  }

  static async writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }
}

module.exports = User; 