import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactDatatable from "@ashvin27/react-datatable";
import {
  addProperty,
  deleteProperty,
} from "../../store/actions/propertyActions";
import { orderBy } from "lodash";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import "sweetalert2/src/sweetalert2.scss";
import { MdLibraryAdd, MdCancel } from "react-icons/md";
import { withRouter } from "react-router-dom";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger m-2",
    cancelButton: "btn btn-success m-2",
  },
  buttonsStyling: false,
});

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

const Dashboard = ({
  profile,
  addProperty,
  properties,
  deleteProperty,
  history,
}) => {
  const [propertyForm, togglePropertyForm] = useState(false);
  const classes = useStyles();
  console.log(history);
  const formik = useFormik({
    initialValues: { propertyName: "", address: "", area: "", cost: "" },
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
      values["tenant"] = null;
      values["url"] = null;
      addProperty(values, profile.email);
      togglePropertyForm(!propertyForm);
      resetForm(formik.initialValues);
    },
  });
  const columns = [
    {
      key: "image",
      text: "Image",
      cell: (record, index) => {
        return (
          <Fragment>
            {record.url && (
              <img
                src={record.url}
                className="m-2"
                alt="Preview"
                width="75rem"
                height="75rem"
              />
            )}
          </Fragment>
        );
      },
    },
    {
      key: "propertyName",
      text: "Property Name",
      sortable: true,
    },
    {
      key: "address",
      text: "Address",
      sortable: true,
    },
    {
      key: "area",
      text: "Area in SFT",
      sortable: true,
    },
    {
      key: "cost",
      text: "Cost",
      sortable: true,
    },
    {
      key: "tenant",
      text: "Tenant",
      sortable: true,
    },
    {
      key: "action",
      text: "Action",
      cell: (record, index) => {
        return (
          <Fragment>
            <button
              onClick={() => history.push(`/property/${record.id}`)}
              className="btn btn-primary btn-sm"
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                swalWithBootstrapButtons
                  .fire({
                    title: "Are you sure?",
                    text: "Do you want to Delete this property?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Delete!",
                    cancelButtonText: "No!",
                    reverseButtons: true,
                  })
                  .then((result) => {
                    if (result.value) {
                      deleteProperty(record, profile.email);
                    }
                  });
              }}
            >
              Delete
            </button>
          </Fragment>
        );
      },
    },
  ];
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    pagination: "advance",
    filename: "Properties",
    button: {
      excel: true,
      print: true,
      csv: true,
    },
  };

  const onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <Fragment>
            {propertyForm && (
              <Fragment>
                <div className="card shadow">
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Register Property
                    </h6>
                    <div className="card-header-tabs">
                      <IconButton
                        onClick={() => togglePropertyForm(!propertyForm)}
                        color="primary"
                        aria-label="Cancel"
                        component="span"
                      >
                        <MdCancel />
                      </IconButton>
                    </div>
                  </div>
                  <div className="card-body">
                    <i className="fas fa-user"></i> Please fill in this form to
                    add a property!
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
                        <button type="submit" className="btn btn-primary">
                          Add Property
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        </div>
        <div className={propertyForm ? "col-lg-6" : "col-lg-12"}>
          <Fragment>
            {properties && (
              // <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">
                    My Properties
                  </h6>
                  <div className="card-header-tabs">
                    <IconButton
                      onClick={() => togglePropertyForm(!propertyForm)}
                      color="primary"
                      aria-label="add Property"
                      component="span"
                    >
                      <MdLibraryAdd />
                    </IconButton>
                  </div>
                  {/* <div class="dropdown no-arrow">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      rel="noopener noreferrer"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div class="dropdown-header">Property Actions:</div>
                      <a
                        class="dropdown-item"
                        rel="noopener noreferrer"
                        href="#"
                        onClick={() => togglePropertyForm(!propertyForm)}
                      >
                        Add a new Property
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        rel="noopener noreferrer"
                      >
                        Another action
                      </a>
                      <div class="dropdown-divider"></div>
                      <a
                        class="dropdown-item"
                        href="#"
                        rel="noopener noreferrer"
                      >
                        Something else here
                      </a>
                    </div>
                  </div> */}
                </div>

                <div className="card-body">
                  <div class="table-responsive">
                    <ReactDatatable
                      className="table table-bordered"
                      config={config}
                      records={properties}
                      columns={columns}
                      onSort={onSort}
                    />
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

Dashboard.propTypes = {
  profile: PropTypes.object,
  addProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { profile }) => {
  const email = profile && profile.email;
  const properties =
    state.firestore.data.properties &&
    state.firestore.data.properties[email] &&
    state.firestore.data.properties[email].myProperties;
  return {
    profile,
    properties,
  };
};

export default compose(
  connect(mapStateToProps, { addProperty, deleteProperty }),
  firestoreConnect((props) => [
    {
      collection: "properties",
      doc: props.profile && props.profile.email,
    },
  ])
)(withRouter(Dashboard));
