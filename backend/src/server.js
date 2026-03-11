const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.DATABASE_URL = mongod.getUri();
  console.log(`MongoDB Memory Server started at ${process.env.DATABASE_URL}`);
  
  const app = require('./libs/app');
  const port = process.env.port || 3000;

  app.set('port', port);
  require('http').createServer(app).listen(port, process.env.SERVER_IP || 'localhost', () => {
    console.log(`Server listening on port ${port}`);
  });
})();
