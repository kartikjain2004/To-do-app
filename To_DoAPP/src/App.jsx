import { useState } from 'react'
import emptyLogo from './assets/empty.png'
import checkLogo from './assets/check.png'
import deleteLogo from './assets/delete.png'
import './App.css'
function Item({todos,onToggle,onDelete}){
  return(<ul>        
    {todos.map((todo)=>(
      <li 
        key={todo.id}
        className='tasks'>
        <img 
          src={todo.completed? checkLogo : emptyLogo} 
          alt="check indicator"
          onClick={()=> onToggle(todo.id)} 
          className='checker'/>
        <span>{todo.text}</span>
        <img 
          src={deleteLogo}
          className='checker' 
          onClick={()=>onDelete(todo.id)}/>
      </li>
    ))}
  </ul>)
}

function App() {
  const [inputText,setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTask = () => {
    if(inputText.trim() === '') return;

    const newTodo={
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setTodos([...todos,newTodo]);
    setInputText('');
  };

  const toggleCheck=(id)=>{
    setTodos(todos.map(todo=>
      todo.id === id?{ ...todo,completed:!todo.completed}:todo
    ))
  };

  const handleDeleteTask=(id)=>{
    setTodos(todos.filter(todo=>todo.id !== id));
  };

  return (
    <>
      <section >
        <div id="center">
          <h1>To Do list</h1>
        </div>
        <div className='task-input'>
          <input 
            className='input-area' 
            type="text" 
            value={inputText}
            onChange={(e)=>setInputText(e.target.value)}
            placeholder='Enter a Task...'/> 
          <button className='adder' type='button' onClick={handleAddTask}>Add</button>
        </div>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <div className='task-container'>
          <Item todos={todos} onToggle={toggleCheck} onDelete={handleDeleteTask}/>
        </div>

      </section>
    </>
  )
}

export default App
