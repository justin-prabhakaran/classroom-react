// src/domain/entity/Teacher.ts

import { DEPARTMENT } from "../../../../core/utils/DEPARTMENT";
import { SROLE } from "../../../../core/utils/SROLE";

export interface Teacher {
    name: string;
    email: string;
    department: DEPARTMENT;
    role: string;
    jwt: string;
    securityRole: SROLE;
}
