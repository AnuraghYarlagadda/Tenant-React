import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";
import { setAlert } from "./alertActions";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import "sweetalert2/src/sweetalert2.scss";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger m-2",
    cancelButton: "btn btn-success m-2",
  },
  buttonsStyling: false,
});

export const signUp = (
  { name, email, password },
  resetForm,
  initialValues
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const fireStore = getFirestore();

  try {
    var res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    dispatch(logOut(true));
    await res.user.sendEmailVerification();
    await fireStore.collection("users").doc(email).set({
      uid: res.user.uid,
      photoURL: null,
      displayName: name,
      email: email,
    });
    dispatch({ type: REGISTER_SUCCESS });
    Swal.fire({
      icon: "success",
      title: "Verification Email \nsent to " + email,
      text:
        "Dear " +
        name +
        " \nPlease verify your email before you try to Login!😃",
    });
    resetForm(initialValues);
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const signInWithGoogle = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    var res = await firebase.login({ provider: "google", type: "popup" });
    var val = await fireStore.collection("users").doc(res.profile.email).get();
    if (val.data()) {
      console.log("Profile Already Exists");
    } else {
      console.log("Creating Profile");
      await fireStore.collection("users").doc(res.profile.email).set({
        uid: res.user.uid,
        photoURL: res.profile.photoURL,
        displayName: res.profile.displayName,
        email: res.profile.email,
      });
      val = await fireStore.collection("users").doc(res.profile.email).get();
    }
    dispatch({ type: LOGIN_SUCCESS });
    Swal.fire({
      icon: "success",
      title: "Hello " + val.data().displayName,
      text: "Welcome to the Project😃",
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const logIn = (credentials, resetForm, initialValues) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const { email, password } = credentials;
  const firebase = getFirebase();
  const fireStore = getFirestore();
  try {
    let res = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(res);
    if (!res.user.emailVerified) {
      swalWithBootstrapButtons
        .fire({
          title: "Email not verified!",
          text: "Do you want us to mail the Link again to " + email + "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Please!",
          cancelButtonText: "No, I've have the Link!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.value) {
            await res.user.sendEmailVerification();
            Swal.fire({
              icon: "success",
              title: "Verification Email \nsent to " + email,
              text: "Please verify your email before you try to Login!😃",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Thanks for confirming!",
              text: "Verify your account with the Link mailed to you!😃",
            });
          }
        });
      dispatch(logOut(true));
    } else {
      const val = await fireStore.collection("users").doc(email).get();
      dispatch({ type: LOGIN_SUCCESS });
      Swal.fire({
        icon: "success",
        title: "Hello " + val.data().displayName,
        text: "Welcome to the Project😃",
      });
    }
    //resetForm(initialValues);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const logOut = (register = false) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
    dispatch({ type: LOGOUT_SUCCESS });
    if (!register) {
      Swal.fire({
        icon: "info",
        title: "Log-Out Successfull!",
        text: "Visit us Back 😃",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT_FAIL });
    dispatch(setAlert(error.message, "error"));
  }
};

export const resetPassword = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase();
  try {
    const { value: email } = await Swal.fire({
      title: "Password reset",
      input: "email",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      await firebase.auth().sendPasswordResetEmail(email);
      Swal.fire({
        icon: "success",
        title: "Password reset!",
        text: "Reset Link has been sent to " + email + "😃",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const changePassword = (email) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const { value: currentPassword } = await Swal.fire({
      title: "Enter your current password",
      input: "password",
      inputPlaceholder: "Enter your current password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Password is required!";
        }
      },
    });

    if (currentPassword) {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);

      const { value: password } = await Swal.fire({
        title: "Enter new password",
        input: "password",
        inputPlaceholder: "Enter new password",
        inputAttributes: {
          maxlength: 20,
          autocapitalize: "off",
          autocorrect: "off",
        },
        inputValidator: (value) => {
          const lowercaseRegex = /(?=.*[a-z])/;
          const uppercaseRegex = /(?=.*[A-Z])/;
          const numericRegex = /(?=.*[0-9])/;
          if (!value) {
            return "Password is required!";
          } else {
            if (value.length < 8)
              return "Length should be atleast 8 characters";
            else if (value.length > 20)
              return "Length shouldn't exceed 20 characters";
            else if (!value.match(numericRegex)) return "One number required!";
            else if (!value.match(lowercaseRegex))
              return "One lowercase required!";
            else if (!value.match(uppercaseRegex))
              return "One uppercase required!";
          }
        },
      });

      if (password) {
        await user.updatePassword(password);
        dispatch(setAlert("Password Updated!", "dark"));
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const editProfile = (email) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    const { value: currentPassword } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Password is required!";
        }
      },
    });

    if (currentPassword) {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);

      const { value: name } = await Swal.fire({
        title: "Enter new Name",
        input: "text",
        inputPlaceholder: "Enter new Name",
        inputAttributes: {
          maxlength: 20,
          autocapitalize: "off",
          autocorrect: "off",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Name is required!";
          } else {
            if (value.length < 5)
              return "Length should be atleast 5 characters";
            else if (value.length > 12)
              return "Length shouldn't exceed 12 characters";
          }
        },
      });

      if (name) {
        await fireStore.collection("users").doc(email).update({
          displayName: name,
        });
        dispatch(setAlert("Profile Updated!", "dark"));
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const deleteAccountPassword = (email) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    const { value: currentPassword } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Password is required!";
        }
      },
    });

    if (currentPassword) {
      var user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);
      await fireStore.collection("users").doc(user.email).delete();
      await user.delete();

      Swal.fire({
        icon: "success",
        title: "Account Deleted!",
        text: "We'll be missing you! 😃",
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const deleteAccountGoogle = (email) => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  try {
    const firebase = getFirebase();
    const fireStore = getFirestore();
    var user = firebase.auth().currentUser;
    await user.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());

    await fireStore.collection("users").doc(user.email).delete();
    await user.delete();
    Swal.fire({
      icon: "success",
      title: "Account Deleted!",
      text: "We'll be missing you! 😃",
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};
