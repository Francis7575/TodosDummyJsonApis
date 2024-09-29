import { useEffect, useState } from "react"
import AddTodos from "./AddTodos"

export type TodosArr = {
  id: number
  todo: string
  userId: number
}

const FetchTodo = () => {
  const [todos, setTodos] = useState<TodosArr[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos')
        const data = await response.json()
        setTodos(data.todos)
        console.log(data)
      } catch (error) {
        console.error('fetching todos error:', error)
      }
    }
    fetchTodos()
  }, [])


  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Fetch Todos</h1>
      {todos.slice(0, 5).map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
          <p>{item.todo}</p>
          <AddTodos setTodos={setTodos} todoText={item.todo} userId={item.userId} />
        </div>
      ))}
    </section>
  )
}

export default FetchTodo