import data from '../../sql3-data.js';

export default async (req, res) => {  
    const id = parseInt(req.url.split('/')[2]);
    const user = await data.getUserById(id);
    if (user) {
      await data.deleteUser(id);
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'User deleted' }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    }
};
