import { Box, Button, TextField, useTheme } from "@mui/material";
import { Form } from "formik";
import * as Yup from "yup"
import { authButtonBoxStyle, authFormBoxStyle, btnStyle } from "../../styles/globalStyle";
import googleLogo from "../../assets/loginRegisterImage/Google.png";
import PasswordField from "./PasswordField";
import useAuthCall from "../../hooks/useAuthCall";

// export const UpdateSchema = Yup.object().shape({
//   userName: Yup.string()
//     .required("Username is required!")
//     .min(3, "Username must be at least 3 characters!"),
//   firstName: Yup.string()
//     .min(2, "First name is too short! It should be at least 2 characters.")
//     .max(50, "First name is too long! It should be at most 50 characters.")
//     .required("First name is required!"),
//   lastName: Yup.string()
//     .min(2, "Last name is too short! It should be at least 2 characters.")
//     .max(50, "Last name is too long! It should be at most 50 characters.")
//     .required("Last name is required!"),
//   email: Yup.string().email("Please enter a valid email address!").required("Email is required!"),
//   password: Yup.string()
//     .required("Password is required!")
//     .min(8, "Password must be at least 8 characters long!")
//     .matches(/\d+/, "Password must contain at least one digit!")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter!")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter!")
//     .matches(/[@$?!%&*]+/, "Password must contain at least one special character (@$?!%&*)")
// });

const AccountForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  }) => {

    const theme = useTheme()

  return (
    <div>
      <Form>
        <Box 
          sx={authFormBoxStyle}
        >
          <TextField
            name="firstName"
            label="First Name"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            name="lastName"
            label="Last Name"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
            <TextField
            name="image"
            label="Image"
            type="text"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.image && Boolean(errors.image)}
            helperText={touched.image && errors.image}
          />
          <TextField
            name="phone"
            label="Phone"
            type="text"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
          <TextField
            name="address"
            label="Adress"
            type="text"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField
            name="profession"
            label="Profession"
            type="text"
            value={values.profession}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.profession && Boolean(errors.profession)}
            helperText={touched.profession && errors.profession}
          />
          <PasswordField
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            errors={errors}
          />
        </Box>
      </Form>
      <Box sx={authButtonBoxStyle}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={btnStyle}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Loading..." : "Update Your Account"}
        </Button>
        
      </Box>      
    </div>
  )
}

export default AccountForm