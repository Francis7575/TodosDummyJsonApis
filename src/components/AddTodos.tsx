import { useState } from 'react'
import { TodosArr } from './FetchTodos'
import { useNavigate } from 'react-router-dom'

type AddTodosProps = {
  setTodos?: React.Dispatch<React.SetStateAction<TodosArr[]>>
  userId?: number
  todoText?: string
}

const AddTodos = ({ setTodos, userId, todoText }: AddTodosProps) => {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todoText,
          userId: userId // Include userId in the request body
        })
      })
      const data = await response.json()
      console.log(data)

      // Ensure setTodos is defined before using it
      if (setTodos) {
        setTodos((prevTodos) => [...prevTodos, data]);
        setIsAdded(true);
        navigate('/todo-list')
      }
    } catch (error) {
      console.error('fetching todos error:', error)
    }
  }

  return (
    <>
      <button onClick={handleAddTodos}>Add Todo</button>
      {isAdded && (
        <p>{todoText}</p>
      )}
    </>
  )
}

export default AddTodos