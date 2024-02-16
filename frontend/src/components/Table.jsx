// import React from 'react'
import axios from "axios";
import { useState } from "react";
import {MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";

const Table = ({todos, setTodos, isLoading}) => {

  const [editText, setEditText] = useState({
    'body' : ''
  })

  const handleChange = (e) => {
    setEditText(prev => ({
      ...prev,
      'body' : e.target.value
    }))

    console.log(editText);
  }

  const handleClick = () => {
    handleEdit(editText.id, editText)
    setEditText({
      'body' : ''
    })
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/todo/${id}/`)

      // returning the new page after deleting and refreshing
      const newList = todos.filter(todo => todo.id !== id )
      setTodos(newList)
    }
    catch (error){
      console.log(error);
    }
  }

  const handleEdit = async(id, value) => {
    try{
      const response = await axios.patch(`http://127.0.0.1:8000/todo/${id}/`, value)
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
      setTodos(newTodos)
    }
    catch(error){
      console.log(error);
    }
  }

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      'completed' : !value
    } )
  }

  return (
    <div className="w-3/4 py-10 mx-auto">
      <table className="w-11/12 max-w-5xl overflow-x-auto shadow-md bg-blue-50 rounded-xl" >
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-m font-semibold tracking-wide text-left"> Checkbox </th>
            <th className="p-3 text-m font-semibold tracking-wide text-left"> Todo </th>
            <th className="p-3 text-m font-semibold tracking-wide text-left"> Status </th>
            <th className="p-3 text-m font-semibold tracking-wide text-left"> Date Checked </th>
            <th className="p-3 text-m font-semibold tracking-wide text-left"> Actions </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? <div>Is Loading</div>:
            <>
              { todos.map( (todoItem, index) =>{
                return(
                  <tr key={todoItem.id}>
                    <td className="p-3" title={todoItem.id} > 
                      <span 
                        onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                        className="inline-block cursor-pointer" > 
                        {todoItem.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank /> }   
                      </span>
                    </td>
                    <td className="p-3 text-sm"> {todoItem.body} </td>
                    <td className="p-3 text-sm text-center">
                      
                        <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? 'bg-green-200' : 'bg-red-200'}`}>
                          {todoItem.completed ? 'Done' : 'Incomplete' }
                        </span>
          
                    </td>
                    <td className="p-3 text-sm"> { new Date(todoItem.created).toLocaleString() } </td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center "> 
                      <span className="text-xl cursor-pointer">
                        <button className="btn bg-warning" onClick={()=>document.getElementById('my_modal_1').showModal()}><MdEditNote onClick={() => setEditText(todoItem)} /> </button>
                      </span>
                      <span className="text-xl cursor-pointer" >
                        <button className="btn bg-error"><MdOutlineDeleteOutline onClick={ () => handleDelete(todoItem.id) } /></button>
                      </span>
                    </td>
                  </tr> 
                )
              } )
                
              }</>}
          
        </tbody>
      </table>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-blue-100">
          <h2 className="font-bold text-lg mb-5">Edit Todo</h2>
          <input type="text " 
            value={editText.body}
            className="input input-bordered w-full "
            onChange={handleChange}
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleClick} className="btn btn-primary">Edit</button>
              <button className="btn btn-default ml-3">Cancel</button>

            </form>
          </div>
        </div>
      </dialog>


    </div>
  )
}

export default Table

