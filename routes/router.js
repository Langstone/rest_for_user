import url from 'url';
import userRoutes from './userRoutes/userRoutes.js';

const routeHandler = (req, res) => {
  const path = url.parse(req.url).pathname;
  if (path === '/users' || path.startsWith('/users')) {
    userRoutes(req, res)
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
};
export default routeHandler;
