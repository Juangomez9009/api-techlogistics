const oracledb = require('oracledb');

const dbConfig = {
  user: 'SYSTEM', 
  password: '1234', 
  connectString: 'localhost/XEPDB1' 
};

async function openConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('✅ Conexión exitosa a Oracle');
    await connection.close();
  } catch (error) {
    console.error('❌ Error al conectar a Oracle:', error);
  }
}

module.exports = { openConnection };
