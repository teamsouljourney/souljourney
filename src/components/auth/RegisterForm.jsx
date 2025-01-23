import * as Yup from "yup"

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required("This field is required!")  // Bu alan zorunludur!
    .min(3, "Username must be at least 3 characters!"),  // Username en az 3 karakter olmalıdır!
  firstName: Yup.string()
    .min(2, "First name is too short! It should be at least 2 characters.")  // Too Short!
    .max(50, "First name is too long! It should be at most 50 characters.")  // Too Long!
    .required("First name is required!"),  // Required
  lastName: Yup.string()
    .min(2, "Last name is too short! It should be at least 2 characters.")  // Too Short!
    .max(50, "Last name is too long! It should be at most 50 characters.")  // Too Long!
    .required("Last name is required!"),  // Required
  email: Yup.string().email("Please enter a valid email address!").required("Email is required!"),  // Invalid email, Required
  password: Yup.string()
    .required("Password is required!")  // Required
    .min(8, "Password must be at least 8 characters long!")  // Minimum 8 karakter
    .matches(/\d+/, "Password must contain at least one digit!")  // Digit karakter içermelidir!
    .matches(/[a-z]/, "Password must contain at least one lowercase letter!")  // Küçük harf içermelidir!
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")  // Büyük harf içermelidir!
    .matches(/[@$?!%&*]+/, "Password must contain at least one special character (@$?!%&*)")  // Özel karakter içermelidir(@$?!%&*)
});

const RegisterForm = () => {
  return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm