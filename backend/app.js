import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3500 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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