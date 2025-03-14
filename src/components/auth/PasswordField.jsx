import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { inputStyle } from "../../styles/globalStyle";

const PasswordField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  touched,
  errors
}) => {
  const { t } = useTranslation();
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <FormControl fullWidth variant="outlined"
      sx={{
        ...inputStyle(theme),
        // Additional styles for the icon button container in dark mode
        ...(theme.palette.mode === "dark" && {
          "& .MuiInputAdornment-root": {
            backgroundColor: "transparent",
          },
          "& .MuiIconButton-root": {
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          },
        }),
      }}
    >
      <InputLabel htmlFor={`${name}`}>{label}</InputLabel>
      <OutlinedInput
        id={`${name}`}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && Boolean(errors[name])}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {/* Conditionally show helperText if there's an error */}
      {touched && errors[name] && (
        <Box
          sx={{
            color: "error.main",
            fontSize: "0.75rem",
            marginTop: "0.25rem",
          }}
        >
          {errors[name]}
        </Box>
      )}
    </FormControl>
  );
};

export default PasswordField;