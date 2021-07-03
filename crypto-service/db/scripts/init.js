const initDB = async function(connection) {
  const query = `CREATE TABLE IF NOT EXISTS crypto_compare (
    id int NOT NULL AUTO_INCREMENT, 
    fsym varchar(5) NOT NULL,
    tsym varchar(5) NOT NULL,
    recordedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rawInfo JSON NOT NULL,
    displayInfo JSON NOT NULL,
    PRIMARY KEY(id)
  );`;

  await connection.query(query);
};

export { initDB };
