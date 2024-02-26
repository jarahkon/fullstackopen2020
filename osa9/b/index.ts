import express from 'express';
import { calculateBmiResult } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const result = calculateBmiResult(Number(height), Number(weight));
      res.send({
        weight,
        height,
        result
      });
    } else {
      throw new Error('params are malformed');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send({
        error: error.message
      });
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});