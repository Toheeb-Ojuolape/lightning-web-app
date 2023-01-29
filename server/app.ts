const express = require('express');
const { node, initNode } = require('./node');
const env = require("./env")

// Configure server
const app = express();

// Initialize node & server
console.log('Initializing Lightning node...');
initNode().then(() => {
  console.log('Lightning node initialized!');
  console.log('Starting server...');
  app.listen(env.PORT, () => {
    console.log(`Server started at http://localhost:${env.PORT}!`);
  });
});


// Routes
app.get('/', async (req:any, res:any, next:Function) => {
    try {
      const info = await node.getInfo();
      res.send(`
        <h1>Node info</h1>
        <pre>${JSON.stringify(info, null, 2)}</pre>
      `);
      next();
    } catch(err) {
      next(err);
    }
  });