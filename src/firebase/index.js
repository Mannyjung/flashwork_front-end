
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcEOwrVBp-N5QgmRSvZFW8Mwtr2bcOqFk",
  authDomain: "fir-react-upload-f1e07.firebaseapp.com",
  projectId: "fir-react-upload-f1e07",
  storageBucket: "fir-react-upload-f1e07.appspot.com",
  messagingSenderId: "96183756879",
  appId: "1:96183756879:web:26b7771079fd6ddf49a23a",
  measurementId: "G-DYFB4ZPWBW"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default }