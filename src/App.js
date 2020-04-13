import React from "react";
import "./App.css";

const App = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [todoList, setTodoList] = useState();
  const [error, setError] = useState();

  const [todoListId, setTodoListId] = [1, 2];

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
    return <div>Error</div>;
  }
  return (
    <div>
      <p>Error</p>
      <p>List</p>
    </div>
  );
};

export default App;
