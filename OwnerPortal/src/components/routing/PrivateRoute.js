import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const PrivateRoute = ({
  component: Component,
  auth: { uid, isLoaded },
  profile,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !uid && isLoaded ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} profile={profile} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const email = state.firebase.auth.email;
  const profile =
    state.firestore.data.users && state.firestore.data.users[email];
  return {
    auth: state.firebase.auth,
    profile,
  };
};

export default compose(
  connect(mapStateToProps, {}),
  firestoreConnect((props) => [{ collection: "users", doc: props.auth.email }])
)(PrivateRoute);
