import React, { useCallback, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { updateProperty } from "../../store/actions/propertyActions";
import { uploadFile } from "../../store/actions/fileActions";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import "sweetalert2/src/sweetalert2.scss";
import CircularProgressWithLabel from "../ui/CircularProgressWithLabel";
import { useDropzone } from "react-dropzone";

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
const numericRegex = /^[0-9]+$/;

const Property = ({ profile, property, updateProperty, uploadFile }) => {
  var myProperty = property && property[0];
  const [propertyForm, togglePropertyForm] = useState(false);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      propertyName: (myProperty && myProperty.propertyName) || "",
      address: (myProperty && myProperty.address) || "",
      area: (myProperty && myProperty.area) || "",
      cost: (myProperty && myProperty.cost) || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      propertyName: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Required!"),
      address: Yup.string().required("Required!"),
      area: Yup.string()
        .matches(numericRegex, "Only numbers allowed!")
        .required("Required!"),
      cost: Yup.string()
        .matches(numericRegex, "Only numbers allowed!")
        .required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      values["id"] = myProperty && myProperty.id;
      values["url"] = myProperty && myProperty.url;
      values["tenant"] = myProperty && myProperty.tenant;
      updateProperty(values, profile.email);
      togglePropertyForm(!propertyForm);
      resetForm(formik.initialValues);
    },
  });
  const [loading, setLoading] = useState(null);
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
    } else {
      alert("Select only a single file");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });
  var reader = new FileReader();
  const [imageSource, setImageSource] = useState(null);
  reader.onload = function (event) {
    setImageSource(event.target.result);
  };
  if (file) reader.readAsDataURL(file);
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <Fragment>
            {propertyForm && (
              <Fragment>
                <div className="card shadow">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Edit Property
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={formik.handleSubmit} id="form">
                      <FormControl
                        className={classes.margin}
                        fullWidth
                        error={
                          formik.errors.propertyName &&
                          formik.touched.propertyName
                        }
                      >
                        <InputLabel htmlFor="propertyName">
                          Property Name
                        </InputLabel>
                        <Input
                          id="propertyName"
                          name="propertyName"
                          type="text"
                          value={formik.values.propertyName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <FormHelperText id="component-error-text">
                          {formik.errors.propertyName &&
                            formik.touched.propertyName &&
                            formik.errors.propertyName}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        className={classes.margin}
                        fullWidth
                        error={formik.errors.address && formik.touched.address}
                      >
                        <InputLabel htmlFor="Address">Address</InputLabel>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={formik.values.address}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <FormHelperText id="component-error-text">
                          {formik.errors.address &&
                            formik.touched.address &&
                            formik.errors.address}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        className={classes.margin}
                        fullWidth
                        error={formik.errors.area && formik.touched.area}
                      >
                        <InputLabel htmlFor="area">Area in SFT</InputLabel>
                        <Input
                          id="area"
                          name="area"
                          type="text"
                          value={formik.values.area}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <FormHelperText id="component-error-text">
                          {formik.errors.area &&
                            formik.touched.area &&
                            formik.errors.area}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        className={classes.margin}
                        fullWidth
                        error={formik.errors.cost && formik.touched.cost}
                      >
                        <InputLabel htmlFor="cost">Cost</InputLabel>
                        <Input
                          id="cost"
                          name="cost"
                          type="text"
                          value={formik.values.cost}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          startAdornment={
                            <InputAdornment position="start">
                              INR
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="component-error-text">
                          {formik.errors.cost &&
                            formik.touched.cost &&
                            formik.errors.cost}
                        </FormHelperText>
                      </FormControl>
                      <div className="text-center">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
          <Fragment>
            {!propertyForm && myProperty && (
              <div className="card shadow">
                <div className="card-body">
                  <h5>Property Name: </h5> <h6>{myProperty.propertyName}</h6>
                  <h5>Address: </h5> <h6>{myProperty.address}</h6>
                  <h5>Cost: </h5> <h6>{myProperty.cost}</h6>
                  <h5>Area in SFT: </h5> <h6>{myProperty.area}</h6>
                  <h5>Tenant: </h5>{" "}
                  <h6>{myProperty.tenant ? myProperty.tenant : "NA"}</h6>
                </div>
                <div className="card-footer">
                  <button
                    onClick={() => togglePropertyForm(!propertyForm)}
                    className="btn btn-warning m-1"
                  >
                    Edit
                  </button>
                  {myProperty && !myProperty.tenant && (
                    <button
                      className="btn btn-info m-1"
                      onClick={async () => {
                        const { value: email } = await Swal.fire({
                          title: "Add Tenant",
                          input: "email",
                          inputPlaceholder: "Enter tenant email address",
                        });

                        if (email) {
                          console.log(email);
                          const tenant = { tenant: email };
                          myProperty = { ...myProperty, ...tenant };
                          updateProperty(myProperty, profile.email, true);
                        }
                      }}
                    >
                      Add Tenant
                    </button>
                  )}
                  {myProperty && myProperty.tenant && (
                    <button
                      className="btn btn-info m-1"
                      onClick={() => {
                        const tenant = { tenant: null };
                        myProperty = { ...myProperty, ...tenant };
                        updateProperty(myProperty, profile.email, true);
                      }}
                    >
                      Delete Tenant
                    </button>
                  )}
                  {file && (
                    <button
                      className="btn btn-success m-1"
                      onClick={async () => {
                        setProgress(0);
                        setLoading(true);
                        const filename =
                          myProperty.id + "." + file.name.split(".").pop();
                        const res = await uploadFile(
                          file,
                          filename,
                          setProgress,
                          setLoading
                        );
                        setFile(null);
                        setImageSource(null);
                        myProperty = { ...myProperty, url: res };
                        updateProperty(myProperty, profile.email);
                      }}
                    >
                      Add Property Image
                    </button>
                  )}
                  {file && (
                    <img
                      src={imageSource}
                      className="m-2"
                      alt="Preview"
                      width="75rem"
                      height="75rem"
                    />
                  )}
                  <Fragment>
                    {loading && <CircularProgressWithLabel value={progress} />}
                  </Fragment>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the file here ...</p>
                    ) : (
                      <p>Drag a file here, or click to select file</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

Property.propTypes = {
  property: PropTypes.array,
};

const mapStateToProps = (
  state,
  {
    profile,
    match: {
      params: { id },
    },
  }
) => {
  const email = profile && profile.email;
  const properties =
    state.firestore.data.properties &&
    state.firestore.data.properties[email] &&
    state.firestore.data.properties[email].myProperties;
  const property =
    properties && properties.filter((property) => property.id === id);
  return {
    profile,
    property,
  };
};

export default compose(
  connect(mapStateToProps, { updateProperty, uploadFile }),
  firestoreConnect((props) => [
    {
      collection: "properties",
      doc: props.profile && props.profile.email,
    },
  ])
)(Property);
