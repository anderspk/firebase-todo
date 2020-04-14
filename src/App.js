import React from "react";
import "./App.css";
import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import CreateList from "./components/CreateList/CreateList";
import { useEffect } from "react";
import { authenticateAnonymously } from "./firebase";

const App = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  const [todoListId, setTodoListId] = useState();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const userCredential = await authenticateAnonymously().catch(() => {
          throw Error("Anonymous auth failed");
        });
        setUserId(userCredential.user.uid);
        if (todoListId) {
          console.log("wut");
        }
      } catch (error) {
        setError(error);
      }
    };
    authenticate();
  }, [todoListId]);

  const onTodoListCreate = (todoListId, username) => {
    setTodoListId(todoListId);
    setUser(username);
  };

  const onCloseTodoList = () => {
    setTodoListId();
    setTodoList();
    setUser();
  };

  const onSelectUser = (username) => {
    setUser(username);
  };

  if (todoList && user) {
    return <div>EditList</div>;
  } else if (todoList) {
    return <div>Errah</div>;
  }
  return (
    <div>
      <ErrorMessage>{error}</ErrorMessage>
      <CreateList onCreate={onTodoListCreate} userId={userId} />
    </div>
  );
};

export default App;
