/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTypedDispatch } from '../hooks/useTypedDispatch';

interface Props {
  name: 'name';
}

function TodoList(): React.ReactElement<Props> {
  const { page, error, loading, todos, limit } = useTypedSelector(
    state => state.todo
  );
  // eslint-disable-next-line no-shadow
  const { fetchTodos, setTodoPage } = useTypedDispatch();
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page]);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
      <div style={{ display: 'flex' }}>
        {pages.map(p => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? '2px solid green' : '1px solid gray',
              padding: 10
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
