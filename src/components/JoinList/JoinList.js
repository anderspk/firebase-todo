import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { addUserToList } from "../../firebase";

const JoinList = ({ users, userId, todoListId, onSelectUser }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState();

  console.log({ users });

  const onSubmitUsername = async (e) => {
    e.preventDefault();
    setError();
    if (!username) {
      setError("Username is required");
      return;
    }

    try {
      await addUserToList(todoListId, username, userId);
      onSelectUser(username);
    } catch (error) {
      setError("Error creating list");
      console.error({ error });
    }
  };

  return (
    <div className="join-list">
      <h1>Select existing user for this list</h1>
      <ul>
        {users.map((user) => (
          <li>
            <button key={user.name} onClick={() => onSelectUser(user.name)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      ...or create a new user:
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
          <button onClick={onSubmitUsername}>Go to todo List</button>
        </form>
      </div>
    </div>
  );
};

export default JoinList;
