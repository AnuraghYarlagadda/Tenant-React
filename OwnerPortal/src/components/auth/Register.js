import React, { Fragment, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import { MdAccountCircle, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

import { signUp, signInWithGoogle } from "../../store/actions/authActions";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
const Register = ({
  auth: { uid, isLoaded, emailVerified },
  signUp,
  signInWithGoogle,
}) => {
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirm_password: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Minimum 5 Characters")
        .max(12, "Maximum 12 Characters")
        .required("Required!"),
      email: Yup.string().email("Invalid E-mail format").required("Required!"),
      password: Yup.string()
        .matches(lowercaseRegex, "One lowercase required!")
        .matches(uppercaseRegex, "One uppercase required!")
        .matches(numericRegex, "One number required!")
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's do not match")
        .required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      signUp(values, resetForm, formik.initialValues);
    },
  });
  const classes = useStyles();
  const [password, togglePassword] = useState(false);
  const [confirm_password, toggleConfirmPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //If Loading Show Spinner
  if (!isLoaded) {
    return (
      <div className="text-center">
        <CircularProgress size="5rem" color="secondary" />
      </div>
    );
  }

  // Redirect if logged-in
  else if (uid && emailVerified) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Sign Up</h6>
        </div>
        <div className="card-body">
          <i className="fas fa-user"></i> Please fill in this form to create an
          account!
          <form onSubmit={formik.handleSubmit} id="form">
            <FormControl
              className={classes.margin}
              fullWidth
              error={formik.errors.name && formik.touched.name}
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="start">
                    <MdAccountCircle
                      size="1.5rem"
                      style={{ color: "#1273de" }}
                    />
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </FormHelperText>
            </FormControl>

            <FormControl
              className={classes.margin}
              fullWidth
              error={formik.errors.email && formik.touched.email}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                label="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="start">
                    <AiOutlineMail size="1.5rem" style={{ color: "#d00205" }} />
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={classes.margin}
              fullWidth
              error={formik.errors.password && formik.touched.password}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                autoComplete="nope"
                id="password"
                name="password"
                type={password ? "text" : "password"}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => togglePassword(!password)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!password ? (
                        <MdVisibility
                          size="1.5rem"
                          style={{ color: "#40bf45" }}
                        />
                      ) : (
                        <MdVisibilityOff
                          size="1.5rem"
                          style={{ color: "#de1212" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </FormHelperText>
            </FormControl>

            <FormControl
              className={classes.margin}
              fullWidth
              error={
                formik.errors.confirm_password &&
                formik.touched.confirm_password
              }
            >
              <InputLabel htmlFor="confirm_password">
                Confirm Password
              </InputLabel>
              <Input
                autoComplete="nope"
                id="confirm_password"
                name="confirm_password"
                type={confirm_password ? "text" : "password"}
                value={formik.values.confirm_password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleConfirmPassword(!confirm_password)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!confirm_password ? (
                        <MdVisibility
                          size="1.5rem"
                          style={{ color: "#40bf45" }}
                        />
                      ) : (
                        <MdVisibilityOff
                          size="1.5rem"
                          style={{ color: "#de1212" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="component-error-text">
                {formik.errors.confirm_password &&
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password}
              </FormHelperText>
            </FormControl>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <hr />
          <p>
            Don't like wasting time in filling the form..? SignIn with Google
            Directly
          </p>
          <button
            className="btn btn-google btn-user btn-block"
            onClick={signInWithGoogle}
          >
            <i className="fab fa-google fa-fw"></i> Login with Google
          </button>
          <hr />
          <h6>
            Already have an account?{" "}
            <a href="#login" className="js-scroll-trigger">
              Sign In
            </a>
          </h6>
        </div>
      </div>
    </Fragment>
  );
};
Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, { signUp, signInWithGoogle })(
  withRouter(Register)
);
