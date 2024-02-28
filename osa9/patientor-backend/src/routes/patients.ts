import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getPatients();
  res.send(result);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
  
    res.send(patient);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).send(errorMessage);
  }
}); 

export default router;