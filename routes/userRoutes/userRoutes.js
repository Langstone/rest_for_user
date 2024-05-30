import url from 'url';
import createUser from './createUser.js';
import deleteUser from './deleteUser.js';
import getAllUsers from './getAllUsers.js';
import getUser from './getUser.js';
import updateUser from './updateUser.js';

const userRoutes = (req, res) => {
  const method = req.method;
  const path = url.parse(req.url, true).pathname;

  res.setHeader('Content-Type', 'application/json');

  if (path === '/users' && method === 'GET') {
    getAllUsers(req, res);
  } else if (path === '/users' && method === 'POST') {
    createUser(req, res);
  } else if (path.startsWith('/users/') && method === 'GET') {
    getUser(req, res);
  } else if (path.startsWith('/users/') && method === 'PUT') {
    updateUser(req, res);
  } else if (path.startsWith('/users/') && method === 'DELETE') {
    deleteUser(req, res)
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: `${path} not found in users`}))
  }
};
 export default userRoutes;
