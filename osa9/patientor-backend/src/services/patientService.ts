import patientsData from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patientsList = patientsData;

const getPatients = (): NonSensitivePatient[] => {
  const patients = patientsList.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });

  return patients;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patientsList.push(newPatient);
  
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };
};

export default {
  getPatients,
  addPatient
};