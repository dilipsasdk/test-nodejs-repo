const express = require('express');
const bodyParser = require('body-parser');
const activityRoutes = require('./routes/activity');

const app = express();
app.use(bodyParser.json());

app.use('/activity', activityRoutes);

// Serve static files for the frontend (index.html)
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
