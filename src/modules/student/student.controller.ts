import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using joi
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .max(20)
        .required()
        .trim()
        .regex(/^[a-zA-Z]+$/)
        .messages({
          'string.base': 'First name should be a type of string',
          'string.empty': 'First name is needed!',
          'string.max': 'Name cannot be more than 20 characters',
          'string.pattern.base': '{#value} is not valid',
          'any.required': 'First name is needed!',
        }),
      middleName: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]*$/)
        .messages({
          'string.base': 'Middle name should be a type of string',
          'string.pattern.base': '{#value} is not valid',
        }),
      lastName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/)
        .messages({
          'string.base': 'Last name should be a type of string',
          'string.empty': 'Last name is needed!',
          'string.pattern.base': '{#value} is not valid',
          'any.required': 'Last name is needed!',
        }),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().required().messages({
        'string.base': "Father's name should be a type of string",
        'string.empty': "Father's name is required",
        'any.required': "Father's name is required",
      }),
      fatherOccupation: Joi.string().required().messages({
        'string.base': "Father's occupation should be a type of string",
        'string.empty': "Father's occupation is required",
        'any.required': "Father's occupation is required",
      }),
      fatherContactNo: Joi.string().required().messages({
        'string.base': "Father's contact number should be a type of string",
        'string.empty': "Father's contact number is required",
        'any.required': "Father's contact number is required",
      }),
      motherName: Joi.string().required().messages({
        'string.base': "Mother's name should be a type of string",
        'string.empty': "Mother's name is required",
        'any.required': "Mother's name is required",
      }),
      motherOccupation: Joi.string().required().messages({
        'string.base': "Mother's occupation should be a type of string",
        'string.empty': "Mother's occupation is required",
        'any.required': "Mother's occupation is required",
      }),
      motherContactNo: Joi.string().required().messages({
        'string.base': "Mother's contact number should be a type of string",
        'string.empty': "Mother's contact number is required",
        'any.required': "Mother's contact number is required",
      }),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().required().messages({
        'string.base': "Local guardian's name should be a type of string",
        'string.empty': "Local guardian's name is required",
        'any.required': "Local guardian's name is required",
      }),
      occupation: Joi.string().required().messages({
        'string.base': "Local guardian's occupation should be a type of string",
        'string.empty': "Local guardian's occupation is required",
        'any.required': "Local guardian's occupation is required",
      }),
      contactNo: Joi.string().required().messages({
        'string.base':
          "Local guardian's contact number should be a type of string",
        'string.empty': "Local guardian's contact number is required",
        'any.required': "Local guardian's contact number is required",
      }),
      address: Joi.string().required().messages({
        'string.base': "Local guardian's address should be a type of string",
        'string.empty': "Local guardian's address is required",
        'any.required': "Local guardian's address is required",
      }),
    });

    const studentSchema = Joi.object({
      id: Joi.string().required().messages({
        'string.base': 'ID should be a type of string',
        'string.empty': 'ID is required',
        'any.required': 'ID is required',
      }),
      name: userNameSchema.required().messages({
        'any.required': 'Name is required',
      }),
      gender: Joi.string()
        .required()
        .valid('male', 'female', 'other')
        .messages({
          'string.base': 'Gender should be a type of string',
          'string.empty': 'Gender is required',
          'any.only': '{#label} is not valid',
          'any.required': 'Gender is required',
        }),
      dateOfBirth: Joi.string().optional().messages({
        'string.base': 'Date of birth should be a type of string',
      }),
      email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': '{#value} is not a valid email',
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
      }),
      contactNo: Joi.string().required().messages({
        'string.base': 'Contact number should be a type of string',
        'string.empty': 'Contact number is required',
        'any.required': 'Contact number is required',
      }),
      emergencyContactNo: Joi.string().required().messages({
        'string.base': 'Emergency contact number should be a type of string',
        'string.empty': 'Emergency contact number is required',
        'any.required': 'Emergency contact number is required',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional()
        .messages({
          'string.base': 'Blood group should be a type of string',
          'any.only': '{#value} is not a valid blood group',
        }),
      presentAddress: Joi.string().required().messages({
        'string.base': 'Present address should be a type of string',
        'string.empty': 'Present address is required',
        'any.required': 'Present address is required',
      }),
      permanentAddress: Joi.string().required().messages({
        'string.base': 'Permanent address should be a type of string',
        'string.empty': 'Permanent address is required',
        'any.required': 'Permanent address is required',
      }),
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian is required',
      }),
      localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian is required',
      }),
      profileImg: Joi.string().uri().optional().messages({
        'string.base': 'Profile image should be a type of string',
        'string.uri': '{#value} is not a valid URI',
      }),
      isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
          'string.base': 'Status should be a type of string',
          'any.only': '{#value} is not valid',
        }),
    });

    /////
    const { student: studentData } = req.body;
    const { error, value } = studentSchema.validate(studentData);

    // console.log(error, value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something is gone wrong',
        error: error,
      });
    }

    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is gone wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
