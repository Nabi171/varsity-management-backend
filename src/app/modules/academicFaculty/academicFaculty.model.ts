import { AcademicDepartment } from './../academicDepartment/academicDepartment.model';
import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
//   const query=this.getQuery();
//   const isDepartmentExist=await AcademicDepartment.fin
// }
// )

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
