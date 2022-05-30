import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

function UserData() {
  const { data, error, loading } = useTypedSelector(state => state.userData);
  const { fetchUser } = useTypedDispatch();

  useEffect(() => {
    fetchUser(localStorage.getItem('accessToken') || '');
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {/* <div>{`email: ${data.email}`}</div> */}
      <div>{`displayName: ${data.displayName}`}</div>
      {/* <div>{`createdAt: ${data.createdAt}`}</div> */}
    </div>
  );
}

export default UserData;
