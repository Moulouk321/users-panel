const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.router.js");
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.use('/', userRouter);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
})

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
