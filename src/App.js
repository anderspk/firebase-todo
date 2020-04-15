import React, { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import CreateList from "./components/CreateList/CreateList";
import * as firebase from "./firebase";
import useQueryString from "./hooks/useQueryString";
import "./App.css";
import EditList from "./components/EditList/EditList";
import JoinList from "./components/JoinList/JoinList";

const App = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  const [todoListId, setTodoListId] = useQueryString("listId");

  useEffect(() => {
    const authenticate = async () => {
      try {
        const userCredential = await firebase
          .authenticateAnonymously()
          .catch(() => {
            throw Error("Anonymous auth failed");
          });

        setUserId(userCredential.user.uid);
        if (todoListId) {
          const fbTodoList = await firebase.getTodoList(todoListId);
          if (fbTodoList.exists) {
            setError(null);
            setTodoList(fbTodoList.data());
          } else {
            setTodoListId();
            throw Error("Todolist not found");
          }
        }
      } catch (error) {
        setError(error);
      }
    };
    authenticate();
  }, [todoListId, setTodoListId]);

  const onTodoListCreate = (todoListId, username) => {
    setTodoListId(todoListId);
    setUser(username);
  };

  const onSelectUser = (username) => {
    setUser(username);
  };

  console.log({ todoList, user });

  if (todoList && user) {
    return <EditList user={user} todoListId={todoListId} />;
  } else if (todoList) {
    return (
      <JoinList
        users={todoList.users}
        {...{ userId, todoListId, onSelectUser }}
      />
    );
  }
  return (
    <div>
      <ErrorMessage>{error}</ErrorMessage>
      <CreateList onCreate={onTodoListCreate} userId={userId} />
    </div>
  );
};

export default App;
