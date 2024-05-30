import data from '../../sql3-data.js';

export default async (req, res) => {
  const getUsers = await data.getUsers();
  res.writeHead(200);
  res.end(JSON.stringify(getUsers));
}