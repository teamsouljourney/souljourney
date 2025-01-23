import * as Yup from "yup"

export const loginScheme = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: string()
    .required("Password is required")
});

const LoginForm = () => {
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm