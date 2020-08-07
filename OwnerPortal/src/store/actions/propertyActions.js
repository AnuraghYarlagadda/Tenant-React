import { setAlert } from "./alertActions";
import { v4 as uuid } from "uuid";

export const addProperty = (property, email) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  try {
    property["id"] = uuid();
    const res = await firestore.collection("properties").doc(email).get();
    console.log(res.data());
    if (res.data() === undefined) {
      await firestore
        .collection("properties")
        .doc(email)
        .set({
          myProperties: [property],
        });
    } else {
      const properties = res.data().myProperties;
      await firestore
        .collection("properties")
        .doc(email)
        .set({
          myProperties: [...properties, property],
        });
    }
    dispatch(setAlert("Property Added!"), "");
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const updateProperty = (property, email, tenant = false) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  console.log(property);
  try {
    const res = await firestore.collection("properties").doc(email).get();
    if (res.data() === undefined) {
      dispatch(setAlert("No properties found!"), "error");
    } else {
      var properties = res.data().myProperties;
      //Find index of specific object using findIndex method.
      const index = properties.findIndex((obj) => obj.id === property.id);
      properties[index] = property;
      await firestore.collection("properties").doc(email).set({
        myProperties: properties,
      });
      if (!tenant) dispatch(setAlert("Property Edited!"), "");
      else dispatch(setAlert("Tenant Modified!"), "");
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const deleteProperty = (property, email) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  try {
    const res = await firestore.collection("properties").doc(email).get();
    if (res.data() === undefined) {
      dispatch(setAlert("No properties found!"), "error");
    } else {
      var properties = res
        .data()
        .myProperties.filter((x) => x.id !== property.id);

      await firestore.collection("properties").doc(email).set({
        myProperties: properties,
      });
      dispatch(setAlert("Property Deleted!"), "");
    }
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};
