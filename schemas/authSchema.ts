import * as Yup from 'yup';

export const getLoginValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .transform((value) => value.trim())
            .email("Invalid email")
            .required("Email is requird"),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'Password must be at most 20 characters')
            .required('Password is required')
    });
};

export const getSignupSchema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .transform((value) => value.trim())
            .min(5, 'Name must be at least 5 characters')
            .max(20, 'Name muber be at most 20 characters')
            .required('Name is required'),
        age: Yup.number()
            .required('Age is required'),
        city: Yup.string()
            .transform((value) => value.trim())
            .required("City is requird"),
        email: Yup.string()
            .transform((value) => value.trim())
            .email("Invalid email")
            .required("Email is requird"),
        password: Yup.string()
            .min(5, 'Password must be at least 5 characters')
            .max(20, 'Password must be at most 20 characters')
            .required('Password is required')
    })
}