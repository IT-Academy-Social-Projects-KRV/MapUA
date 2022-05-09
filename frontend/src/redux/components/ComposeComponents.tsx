import React from 'react';
import UserList from './UserData';
import TodoList from './TodoList';

function ComposeComponents() {
  return (
    <div>
      <UserList />
      <hr />
      <TodoList />
    </div>
  );
}

export default ComposeComponents;
