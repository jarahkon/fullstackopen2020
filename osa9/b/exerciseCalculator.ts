interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (): ExerciseResult => {
  const args = process.argv;
  if (args.length < 4) throw new Error('Not enough arguments');
  let target = 0;
  let exerciseList: number[] = [];

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  }
  else {
    throw new Error('Provided target value was not a number');
  }

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exerciseList = exerciseList.concat(Number(args[i]));
    } else {
      throw new Error('Provided exercise values were not numbers');
    }
  }

  return calculateExerciseResult(exerciseList, target);

};

export const calculateExerciseResult = (exerciseList: number[], target: number): ExerciseResult => {
  if (target <= 0) {
    throw new Error('target should be greater than 0');
  }
  const periodLength = exerciseList.length;
  const trainingDays = exerciseList.filter(e => e > 0).length;
  const average = exerciseList.reduce((sum, current) => sum + current, 0) / periodLength;
  const success = average >= target;
  const percentOfTarget = average / target;
  let rating = 1;
  let ratingDescription = 'bad';

  if (percentOfTarget > 0.70 && percentOfTarget < 1) {
    rating = 2;
    ratingDescription = 'good';
  }
  else if (percentOfTarget >= 1) {
    rating = 3;
    ratingDescription = 'awesome';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  console.log(calculateExercises());
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}