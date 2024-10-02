// src/domain/entity/Student.ts

import { DEPARTMENT } from "../../../../core/utils/DEPARTMENT";
import { SROLE } from "../../../../core/utils/SROLE";
import { YEAR } from "../../../../core/utils/YEAR";

export interface Student {
  registerNumber: number;
  name: string;
  email: string;
  department: DEPARTMENT;
  year: YEAR;
  section: string;
  jwt: string;
  securityRole: SROLE;
}
