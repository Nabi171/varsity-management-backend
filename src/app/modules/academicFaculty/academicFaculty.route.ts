import { AcademicFaculty } from "./academicFaculty.model";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../middlewares/validateRequest";

const router=express.Router();

router.post(
    '/create-academic-faculty',
    validateRequest(
        AcademicFacultyValidation.createAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
)
export const AcademicFacultyRoutes=router;