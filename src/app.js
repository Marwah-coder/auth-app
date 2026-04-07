const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router } = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', router);

// Home redirect
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;