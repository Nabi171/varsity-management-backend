import { z } from 'zod';

// Define the userNameSchema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'Name cannot be more than 20 characters')
    .regex(/^[A-Za-z]+$/, 'firstName is not valid')
    .nonempty('firstName is needed!'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'lastName is not valid')
    .nonempty('LastName is needed!'),
});

// Define the guardianSchema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// Define the localGuardianSchema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Define the studentSchema
const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Gender is not valid' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Email is not valid').nonempty('Email is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z
    .string()
    .nonempty('Emergency contact number is required'),
  bloogGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddres: z.string().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
