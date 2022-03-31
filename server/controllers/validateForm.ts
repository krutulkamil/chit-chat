import {NextFunction, Request, Response} from 'express';
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

const validateForm = (req: Request, res: Response, next: NextFunction) => {
    const formData = req.body;
    formSchema
        .validate(formData)
        .catch(() => {
            res.status(422).send();
        })
        .then(valid => {
            if (valid) {
                console.log("form is good");
                next();
            } else {
                res.status(422).send();
            }
        });
};

export default validateForm;