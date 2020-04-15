import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import AsyncError from "./utils/AsyncError";

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

export const getTodoList = (todoListId) =>
  firestore.collection("todoLists").doc(todoListId).get();

export const getTodoListItems = (todoListId) =>
  firestore.collection("todoLists").doc(todoListId).collection("items").get();

export const addNewTodo = async (newTodo, todoListId, userId) => {
  const querySnapshot = await getTodoListItems(todoListId).catch(AsyncError);
  const todoListItems = await querySnapshot.docs;
  const matchingItem = todoListItems.find(
    (todoListItem) =>
      todoListItem.data().name.toLowerCase() === newTodo.toLowerCase()
  );

  if (!matchingItem) {
    return firestore
      .collection("todoLists")
      .doc(todoListId)
      .collection("items")
      .add({
        name: newTodo,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: userId,
      });
  } else throw new Error("Item already exists in list!");
};

export const streamTodoList = (todoListId, observer) =>
  firestore
    .collection("todoLists")
    .doc(todoListId)
    .collection("items")
    .orderBy("created")
    .onSnapshot(observer);

export const deleteTodo = async (todoId, todoListId) => {
  firestore
    .collection("todoLists")
    .doc(todoListId)
    .collection("items")
    .doc(todoId)
    .delete();
};

export const addUserToList = (todoListId, username, userId) =>
  firestore
    .collection("todoLists")
    .doc(todoListId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId,
        name: username,
      }),
    });
