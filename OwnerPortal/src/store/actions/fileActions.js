import { setAlert } from "./alertActions";

async function uploadTaskPromise(
  storageRef,
  file,
  fileName,
  setProgress,
  setLoading,
  dispatch
) {
  return new Promise(function (resolve, reject) {
    var metadata = {
      contentType: file.type,
    };
    const uploadTask = storageRef.child(fileName).put(file, metadata);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      function error(error) {
        console.log("error", error);
        dispatch(setAlert(error.code, "error"));
        reject();
      },
      function complete() {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(downloadURL);
          setLoading(false);
          dispatch(setAlert("File Uploaded!", "dark"));
        });
      }
    );
  });
}

export const uploadFile = (file, fileName, setProgress, setLoading) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    console.log(file);
    const storageUrl = await uploadTaskPromise(
      storageRef,
      file,
      fileName,
      setProgress,
      setLoading,
      dispatch
    );
    return storageUrl;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const getDownloadURL = (fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    const res = await storageRef.child(fileName).getDownloadURL();
    return res;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const deleteFile = (fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    const res = await storageRef.child("IMG_9525.MOV").delete();
    return res;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};

export const listFiles = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    var files = [];
    const firebase = getFirebase();
    var storageRef = firebase.storage().ref();
    // Find all the prefixes and items.
    const res = await storageRef.listAll();
    res.items.forEach((itemRef) => {
      files.unshift(itemRef.location.path);
    });
    return files;
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, "error"));
  }
};
