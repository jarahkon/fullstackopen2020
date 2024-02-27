export const calculateBmiResult = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 16) {
  return 'Underweight (severe thinness)';
  }
  else if (bmi >= 16 && bmi <= 16.9) {
  return 'Underweight (moderate thinness)';
  }
  else if (bmi >= 17 && bmi <= 18.4) {
  return 'Underweight (mild thinness)';
  }
  else if (bmi >= 18.5 && bmi <= 24.9) {
  return 'Normal (healthy weight)';
  }
  else if (bmi >= 25 && bmi <= 29.9) {
  return 'Overweight (pre-obese)';
  }
  else if (bmi >= 30 && bmi <= 34.9) {
  return 'Obese (class I)';
  }
  else if (bmi >= 35 && bmi <= 39.9) {
  return 'Obese (class II)';
  }
  else return 'Obese (class III)';
};

const calculateBmi = (): string => {
  const args = process.argv;
  if (args.length < 4) throw new Error('Not enough parameters');
  if (args.length > 4) throw new Error('Too many parameters');

  let height = 0;
  let weight = 0;

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    height = Number(args[2]);
    weight = Number(args[3]);
  } else {
    throw new Error('Provided values were not numbers');
  }

  return calculateBmiResult(height, weight);
};

try {
  console.log(calculateBmi());
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}