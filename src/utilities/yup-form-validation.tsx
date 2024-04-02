import * as yup from "yup";

export const registerFormSchema = yup.object().shape({
    firstName: yup.string()
    .required()
    .min(2, "First name must be between 2 and 24 characters")
    .max(24, "First name must be between 2 and 24 characters")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed"), //regex pattern, says we are only allowing lower case and upper case letters, as well as underscores, and a space

    lastName: yup.string()
    .required()
    .min(2, "Last name must be between 2 and 24 characters")
    .max(24, "Last name must be between 2 and 24 characters")
    .matches(/^[a-zA-Z_ ]*$/, "No special characters allowed"), //regex pattern, says we are only allowing lower case and upper case letters, as well as underscores, and a space

    email: yup.string()
    .required("An email address is required")
    .email("Please provide a valid email address"),

    password: yup.string()
    .required("A password is required")
    .min(6, "Password must be between 6 and 128 characters")
    .max(128, "Password must be between 6 and 128 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least 6 characters, 1 uppercase character, 1 lowercase character, 1 number, and 1 special character."),

    confirmPassword: yup.string()
    .required("Please confirm your password")
    .min(6, "Password must be between 6 and 128 characters")
    .max(128, "Password must be between 6 and 128 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match!"), // yup method that checks if this matches the password

    status: yup.string()
    .max(64, "Status cannot exceed 64 characters")

});