/* eslint-disable no-underscore-dangle */
import { resolve, join } from 'path';
// import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// eslint-disable-next-line import/extensions
import connectDB from './src/config/db.js';
// eslint-disable-next-line import/extensions
import routes from './src/routes/index.js';
// eslint-disable-next-line import/extensions
import { errorHandler, notFound } from './src/middlewares/errorHandlers.js';

// eslint-disable-next-line no-underscore-dangle
// console.log(__dirname);

// eslint-disable-next-line no-underscore-dangle
// const __filename = fileURLToPath(import.meta.url);

// // eslint-disable-next-line no-underscore-dangle
const __dirname = resolve();

const clientPath = join(__dirname, '/client/build');

dotenv.config({ path: './.env' });

// console.log(resolve(__dirname, 'client', 'build', 'index.html'));

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(helmet());
app.use(express.text());
// app.use(express.json());
// app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
  app.use(express.static(clientPath));
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// System Routes
app.use('/audit/api/v1', routes);

// Settting up Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
