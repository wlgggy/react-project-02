import { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F5E6D3',
      padding: '60px 20px 40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '300',
      color: '#8B7355',
      marginBottom: '0',
      letterSpacing: '2px'
    },
    inputSection: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
    },
    inputContainer: {
      display: 'flex',
      gap: '12px'
    },
    input: {
      flex: 1,
      padding: '16px 20px',
      fontSize: '15px',
      border: '2px solid #E8DCC8',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: 'white',
      fontWeight: '400',
      color: '#4A4035'
    },
    inputFocus: {
      borderColor: '#C9B89A'
    },
    addButton: {
      backgroundColor: '#F2C94C',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    todoList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0'
    },
    todoItem: {
      backgroundColor: 'white',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.2s',
      borderBottom: '1px solid #F0F0F0',
      cursor: 'pointer'
    },
    todoItemFirst: {
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px'
    },
    todoItemLast: {
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      borderBottom: 'none'
    },
    todoItemHover: {
      backgroundColor: '#FAFAF8'
    },
    checkbox: {
      width: '22px',
      height: '22px',
      borderRadius: '6px',
      border: '2px solid #D4B896',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'all 0.2s',
      cursor: 'pointer',
      backgroundColor: 'white'
    },
    checkboxChecked: {
      backgroundColor: '#5BC0BE',
      borderColor: '#5BC0BE'
    },
    checkIcon: {
      width: '12px',
      height: '9px',
      borderLeft: '2.5px solid white',
      borderBottom: '2.5px solid white',
      transform: 'rotate(-45deg) translateY(-1px)',
      opacity: 0
    },
    checkIconVisible: {
      opacity: 1
    },
    todoText: {
      flex: 1,
      fontSize: '16px',
      color: '#4A4035',
      fontWeight: '400',
      transition: 'all 0.2s'
    },
    todoTextCompleted: {
      textDecoration: 'line-through',
      color: '#A89583'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#D4B896',
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s',
      fontSize: '24px',
      lineHeight: '1'
    },
    deleteButtonHover: {
      backgroundColor: '#FDF8F3',
      color: '#E88B7D'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
    },
    emptyEmoji: {
      fontSize: '56px',
      marginBottom: '16px'
    },
    emptyText: {
      fontSize: '16px',
      color: '#8B7355',
      fontWeight: '400'
    }
  };

  const [hoveredId, setHoveredId] = useState(null);
  const [deleteHoverId, setDeleteHoverId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Todo List</h1>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Add a new task..."
              style={{
                ...styles.input,
                ...(isInputFocused ? styles.inputFocus : {})
              }}
            />
            <button
              onClick={addTodo}
              style={styles.addButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div style={styles.todoList}>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyEmoji}>📝</div>
              <div style={styles.emptyText}>No tasks yet. Add one to get started!</div>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                style={{
                  ...styles.todoItem,
                  ...(index === 0 ? styles.todoItemFirst : {}),
                  ...(index === todos.length - 1 ? styles.todoItemLast : {}),
                  ...(hoveredId === todo.id ? styles.todoItemHover : {})
                }}
                onMouseEnter={() => setHoveredId(todo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    ...styles.checkbox,
                    ...(todo.completed ? styles.checkboxChecked : {})
                  }}
                >
                  <div style={{
                    ...styles.checkIcon,
                    ...(todo.completed ? styles.checkIconVisible : {})
                  }} />
                </div>

                <span
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    ...styles.todoText,
                    ...(todo.completed ? styles.todoTextCompleted : {})
                  }}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    ...styles.deleteButton,
                    ...(deleteHoverId === todo.id ? styles.deleteButtonHover : {})
                  }}
                  onMouseEnter={() => setDeleteHoverId(todo.id)}
                  onMouseLeave={() => setDeleteHoverId(null)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}