// userController.js
class UserController {
  constructor() {
    this.users = [
      { id: 1, user: 'FirstUser', name: 'First User' },
      { id: 2, user: 'SecondUser', name: 'Second User' }
    ];
    this.nextId = 2;
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    const user = this.users.find(p => p.id === parseInt(id));
    if (!user) {
      return null;
    }
    return user;
  }

  create(user) {
    const newUser = {
      id: this.nextId++,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteById(id) {
    const userIndex = this.users.findIndex(p => p.id === parseInt(id));
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
    return userIndex;
  }
}

module.exports = new UserController();