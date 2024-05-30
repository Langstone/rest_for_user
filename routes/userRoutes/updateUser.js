import data from '../../sql3-data.js';

export default (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const id = parseInt(req.url.split('/')[2]);
    const parsedBody = new URLSearchParams(body);
    const name = parsedBody.get('name');
    const age = parsedBody.get('age');

    if (name && age) {
      const user = { name, age: parseInt(age) };
      await data.updateUser(id, user);
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'User updated'}))
    } else {
      res.writeHead(404);
      res.end(JSON.stringify('User cannot be updated'))
    }
  });
};
