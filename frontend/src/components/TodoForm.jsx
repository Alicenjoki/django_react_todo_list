import React, {useState} from 'react'
import axios from 'axios'

const TodoForm = ({setTodos, fetchData}) => {


  const [newTodo, setNewTodo] = useState({
    'body' : ''
  })

  const handleChange = (e) => {
    setNewTodo(prev => ({
      ...prev,
      'body' : e.target.value
    }))
    console.log(newTodo);
  }

  const postTodo = async () =>{
    try{
      await axios.post("http://127.0.0.1:8000/todo/", newTodo)
      setNewTodo( {'body' : ''} )
      // setTodos(prevTodos => [...prevTodos, newTodo])
      fetchData()
    }
    catch (error){
      console.log(error)
    }

  }



  return (
    <div className="w-6/12 mx-auto">
      <input type="text" placeholder="Type Todo" className="input input-bordered mb-4 input-accent w-full max-w-xs"
        onChange={handleChange} value={newTodo.body}
      />
      <button className="btn btn-primary ml-3 " 
        onClick={postTodo} 
        onKeyDown={ (e) =>{
          if(e.key === 'enter'){
            postTodo()
          }
        } }
      >Add Todo
      </button>
      {/* <div>
        <button className="btn btn-success">Add Todo</button>
      </div> */}
    </div>
  )
}

export default TodoForm
