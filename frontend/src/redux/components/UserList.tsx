import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
// import { fetchUsers } from '../actions-creators/user';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

function UserList() {
  const { users, error, loading } = useTypedSelector(state => state.user);
  const { fetchUsers } = useTypedDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;
