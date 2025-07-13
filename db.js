import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  user: 'root',
  password: 'VhcpjLlHQlgpkgTjwGTviSKmxHIuNrDN',
  database: 'webclass'
});

export default connection;
