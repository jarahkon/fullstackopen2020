import patientsData from '../data/patients';
import { NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  const patients = patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
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

export default {
  getPatients
};