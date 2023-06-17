import express from 'express';
import cors from 'cors';
import { getQueryResult } from './route/route.js';

const app = express();
app.use(cors());

const PORT = 3500 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/chatbot',getQueryResult )

const run = () => {
  try {
    app.listen(PORT, () => {
        console.log(`Connected to PORT:${PORT}`)
    });
  } catch (error) {
    console.log(error.message);
  }
};


run()