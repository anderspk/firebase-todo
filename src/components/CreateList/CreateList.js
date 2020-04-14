import React from "react";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { createTodoList } from "../../firebase";

const CreateList = ({ onCreate, userId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState();

  const onSubmitUsername = async (e) => {
    e.preventDefault();
    setError();
    if (!username) {
      setError("Username is required");
      return;
    }

    try {
      const docRef = await createTodoList(username, userId);
      onCreate(docRef.id, username);
    } catch (error) {
      setError("Error creating list");
      console.error({ error });
    }
  };

  return (
    <div className="create-list">
      <header>
        <h1>Welcome to the Todo List app!</h1>
        <h3>Powered by React and Firebase</h3>
      </header>
      <div className="form-container">
        <form name="createListForm">
          <label htmlFor="username">What is your name?</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <ErrorMessage>{error}</ErrorMessage>
          <button onClick={onSubmitUsername}>Create new todo list</button>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
