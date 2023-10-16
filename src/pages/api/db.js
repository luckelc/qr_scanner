// pages/api/db.js
import {mysql} from 'mysql2/promise';

export default async (req, res) => {
    // Connect to the MySQL database
    const connection = await mysql.createConnection({
      host: 'mysql',
      user: 'root',
      password: 'ynjFM:Ty$hs?&8Kg',
      database: 'usermail_saves',
    });
  
    try {
      // Perform database operations
      const [rows] = await connection.execute('SELECT * FROM your_table');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
    } finally {
      // Close the database connection
      await connection.end();
    }
  };