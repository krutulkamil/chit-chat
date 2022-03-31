import {Request, Response} from 'express';
import * as Yup from "yup";

const formSchema = Yup.object({
    username: Yup.string()
        .required("Username required")
        .min(6, "Username too short")
        .max(28, "Username too long"),
    password: Yup.string()
        .required("Password required")
        .min(6, "Password too short")
        .max(28, "Password too long"),
});

const validateForm = (req: Request, res: Response) => {
    const formData = req.body;
    formSchema.validate(formData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors)
        })
        .then(valid => {
            if (valid) {
                // res.status(200).send();
                console.log("form is good")
            }
        });
};

export default validateForm;