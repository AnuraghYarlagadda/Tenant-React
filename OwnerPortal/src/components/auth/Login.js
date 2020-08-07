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
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

import {
  logIn,
  signInWithGoogle,
  resetPassword,
} from "../../store/actions/authActions";

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

const Login = ({
  auth: { uid, isLoaded, emailVerified },
  logIn,
  signInWithGoogle,
  resetPassword,
}) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid E-mail format").required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      logIn(values, resetForm, formik.initialValues);
    },
  });
  const classes = useStyles();
  const [password, togglePassword] = useState(false);
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
          <h6 className="m-0 font-weight-bold text-primary">Sign In</h6>
        </div>
        <div className="card-body">
          <i className="fas fa-user"></i> Sign Into Your Account
          <form onSubmit={formik.handleSubmit}>
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
          <hr />
          <button
            className="btn btn-google btn-user btn-block"
            onClick={signInWithGoogle}
          >
            <i className="fab fa-google fa-fw"></i> Login with Google
          </button>
          <hr />
          <h6>
            Trouble Logging-In?{" "}
            <a href="#" onClick={resetPassword} rel="noopener noreferrer">
              Forgot Password
            </a>
          </h6>
          <hr />
          <h6>
            Don't have an account?{" "}
            <a href="#register" className="js-scroll-trigger">
              Sign Up
            </a>
          </h6>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, {
  logIn,
  signInWithGoogle,
  resetPassword,
})(withRouter(Login));
