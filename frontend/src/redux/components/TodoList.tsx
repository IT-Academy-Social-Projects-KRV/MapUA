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

  const { fetchTodos, setTodoPage } = useTypedDispatch();
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page]);

  if (loading) {
    return <h1>Loading...</h1>;
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
          <button
            type="button"
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? '2px solid green' : '1px solid gray',
              padding: 10
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
