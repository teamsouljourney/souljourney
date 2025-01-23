import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("This field is required!")
    .min(3, "Username must be at least 3 characters!"),
  firstName: Yup.string()
    .min(2, "First name is too short! It should be at least 2 characters.")
    .max(50, "First name is too long! It should be at most 50 characters.")
    .required("First name is required!"),
  lastName: Yup.string()
    .min(2, "Last name is too short! It should be at least 2 characters.")
    .max(50, "Last name is too long! It should be at most 50 characters.")
    .required("Last name is required!"),
  email: Yup.string().email("Please enter a valid email address!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long!")
    .matches(/\d+/, "Password must contain at least one digit!")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
    .matches(/[@$?!%&*]+/, "Password must contain at least one special character (@$?!%&*)")
});

const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm