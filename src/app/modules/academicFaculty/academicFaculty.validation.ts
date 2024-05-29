import { invalid } from "joi";

const createAcademicFacultyValidationSchema=z.object({
    body.z.object({
        name:z.string({
            invalid_type_error:"Academic Faculty must be string";
        })
    })
})