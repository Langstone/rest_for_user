import sqlite3 from "sqlite3";
const db = new sqlite3.Database("youdatabase.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);
export default { 
  async getUsers() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return users;
    } catch (err) {
      return null;
    }
  },

  async addUser(user) {
    const lastId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (name, age) VALUES ($1, $2)`, [user.name, user.age], function(err) {
        if (err) {
          reject(err);
        } else {
           resolve(this.changes);
        }
      });
    });
    return { id: lastId, ...user };
  },

  async updateUser(id, updateData) {
    const changes = new Promise((resolve, reject) => {
      db.run(`UPDATE users SET name = $1, age = $2 WHERE id = $3`, [updateData.name, updateData.age, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
    if (changes === 0) {
      return null;
    }
    return this.getUserById(id);
  },

  async deleteUser(id) {
    const changes = new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id = $1`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
    return changes > 0;
  },

  async getUserById(id) {
    const user = new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = $1`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return user;
  }
}
