import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD9sFNWbXV9i_l3G9egskX9dmTQuVfPtg",
  authDomain: "fir-tutorial-8e9f3.firebaseapp.com",
  projectId: "fir-tutorial-8e9f3",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
