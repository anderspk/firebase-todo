import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD9sFNWbXV9i_l3G9egskX9dmTQuVfPtg",
  authDomain: "fir-tutorial-8e9f3.firebaseapp.com",
  databaseURL: "https://fir-tutorial-8e9f3.firebaseio.com",
  projectId: "fir-tutorial-8e9f3",
  storageBucket: "fir-tutorial-8e9f3.appspot.com",
  messagingSenderId: "169381579008",
  appId: "1:169381579008:web:5ac0eca0bee7956c568be5",
  measurementId: "G-TJ7DHRR5ZF",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();

export const authenticateAnonymously = () =>
  firebase.auth().signInAnonymously();

export const createTodoList = (username, userId) =>
  firestore.collection("todoLists").add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: username,
      },
    ],
  });
