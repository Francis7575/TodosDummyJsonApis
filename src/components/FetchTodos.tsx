import { FormEvent, useEffect, useState } from "react"

export type Todos = {
  id: number
  todo: string
  userId: number
}

const FetchTodo = () => {
  const [todos, setTodos] = useState<Todos[]>([])
  const [todoText, setTodoText] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [areMoreTodosVisible, setAreMoreTodosVisible] = useState<boolean>(false);


  const fetchTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos')
      const data = await response.json()
      setTodos(data.todos)
      // Store fetched todos in localStorage
      localStorage.setItem("todos", JSON.stringify(data.todos));
      console.log(data)
    } catch (error) {
      console.error('fetching todos error:', error)
    }
  }

  useEffect(() => {
    // Load todos from localStorage on component mount
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      fetchTodos(); // Call fetchTodos if no stored todos are found
    }
  }, []);

  const handleAddTodo = async () => {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        todo: todoText,
        userId: Math.floor(Math.random() * 10) + 1,
      })
    })
    const data = await response.json()
    setTodos((prevTodos) => [data, ...prevTodos])
    setTodoText("");
    // Update localStorage after adding a new todo
    localStorage.setItem("todos", JSON.stringify([data, ...todos]));
    console.log(data)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo()
  }

  const loadMoreTodos = () => {
    setVisibleCount((prevCount) => prevCount + 5);
    setAreMoreTodosVisible(true);
  };

  const hideMoreTodos = () => {
    setVisibleCount(5); // Reset visible count to 5
    setAreMoreTodosVisible(false); // Hide more todos
  };

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Fetch Todos</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <form onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", width: "100%", margin: "0 auto", maxWidth: "300px" }}>
          <input style={{ border: "1px solid blue", padding: "6px", width: "100%" }}
            type="text"
            name="todos"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button>ADD</button>
        </form>
      </div>
      <section style={{ margin: "40px 0 0 40px" }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {todos.slice(0, visibleCount).map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <li>{item.todo}</li>
              <div style={{ display: "flex", gap: "12px" }}>
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "16px" }}>
          {visibleCount < todos.length && (
            <button onClick={loadMoreTodos}
              style={{ backgroundColor: "blue", cursor: "pointer", color: "white", border: "none", padding: "8px 8px" }}>
              Load More
            </button> // Button to load more todos
          )}
          {areMoreTodosVisible && (
            <button onClick={hideMoreTodos}
              style={{ backgroundColor: "blue", cursor: "pointer", color: "white", border: "none", padding: "8px 8px" }}>
              Hide Todos
            </button> // Button to load more todos
          )}
        </div>
      </section>
    </section>
  )
}

export default FetchTodo