import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
// import studentValidationSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //data validation using zod
    const zodparsedData = studentValidationSchema.parse(studentData);
    //data validation using Joi
    // const { error,value } = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something is gone wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is gone wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
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
      message: 'Student is retrieved successfully',
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
