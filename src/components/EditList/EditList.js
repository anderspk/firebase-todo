import React, { useState, useEffect } from "react";
import * as firebase from "../../firebase";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const EditList = ({ user, todoListId }) => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const unsubscribe = firebase.streamTodoList(todoListId, {
      next: (querySnapshot) => {
        const updatedTodoList = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setTodoList(updatedTodoList);
      },
      error: () => setErrorMessage("Fetching todolist items failed"),
    });

    return unsubscribe;
  }, [todoListId]);

  const onSubmitNewTodo = async (e) => {
    e.preventDefault();
    setErrorMessage();
    try {
      await firebase.addNewTodo(newTodo, todoListId, user);
      setNewTodo("");
    } catch (error) {
      setErrorMessage(error.message);
      console.error({ error });
    }
  };

  const deleteTodo = (todoId) => {
    setErrorMessage();
    try {
      firebase.deleteTodo(todoId, todoListId);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="edit-list">
      <h1>Hello, {user}</h1>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <form>
        <label htmlFor="todo">Add new todo:</label>
        <input
          type="text"
          name="todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={onSubmitNewTodo}>Add</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditList;
