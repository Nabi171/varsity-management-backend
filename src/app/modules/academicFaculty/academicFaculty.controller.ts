import httpStatus from 'http-status';
import { AcademicFacultyServices } from './academicFaculty.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.ok,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
};
