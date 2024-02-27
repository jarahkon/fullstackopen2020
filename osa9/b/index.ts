import express from 'express';
import { calculateBmiResult } from './bmiCalculator';
import { calculateExerciseResult } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmiResult(Number(height), Number(weight));
    return res.send({
      weight,
      height,
      result
    });
  } else {
    return res.status(400).send({
      error: 'malformatted params'
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const { target, daily_exercises } = req.body;
  try {
    if (!target || !daily_exercises) {
      throw new Error('parameters missing');
    }
    let exerciseList: number[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (isNaN(Number(daily_exercises[i]))) {
        throw new Error('malformatted parameters');
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      exerciseList = exerciseList.concat(Number(daily_exercises[i]));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isNaN(Number(target))) {
      throw new Error('malformatted parameters');
    }
    const result = calculateExerciseResult(exerciseList, Number(target));
    return res.send(result);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).send({
      error: errorMessage
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});