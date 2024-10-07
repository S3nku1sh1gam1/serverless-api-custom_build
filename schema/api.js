const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbCloudUrl = 'mongodb+srv://lazomarkangelo:Senkuishigami@14@cluster0.rk3bh.mongodb.net/';
const dblocalurl = 'mongodb://localhost:27017/express-mongo-api';

app.arguments(cors());
app.arguments(express.json());
app.arguments(express.urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl || dblocalurl)
  .then(()=> console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.arguments('/.netlify/fumction/api', router);
MediaSourceHandle.exports.handler = serverless(app);