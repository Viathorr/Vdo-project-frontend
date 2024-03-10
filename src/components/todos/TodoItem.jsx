import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from 'react-redux';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
 
const TodoItem = ({ item, fetchTodos, setUpdateTodoClicked }) => {
  const todosInfo = useSelector(state => state.todos.value);
  const axiosJWT = useAxiosPrivate();

  const getTimeRemaining = () => {
    if (item.checked) {
      return 'done';
    }
    
    if (!item.deadline) {
      return 'no deadline';
    }

    const now = new Date();
    const timeDiff = item.deadline.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      return 'expired';
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''} left`;
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} left`;
    }
    
    const minutes = Math.floor(timeDiff / (1000 * 60));
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  };

  const handleCheck = async (id) => {
    const neededTodo = todosInfo.todos.find(todo => todo.id === id);
    const updatedTodo = { ...neededTodo, checked: !neededTodo.checked };
    try {
      await axiosJWT.put(`/todos?id=${id}`, updatedTodo);
      await fetchTodos();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(`/todos?id=${id}`);
      await fetchTodos();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <li key={item.id} className='todo-item'>
      <div>
        <input type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} />
        <label className={item.checked ? 'todo-label checked' : 'todo-label'}>{item.name}</label>
      </div>
      <p
        className="deadline-label"
        style={{
        color: getTimeRemaining() === 'no deadline'
          ? '#999'
          : getTimeRemaining() === 'expired'
            ? '#ff0000'
            : getTimeRemaining() === 'done'
              ? '#27cb27'
              : '#e0ba11'
        }}
      >{getTimeRemaining()}</p> 
      {item.deadline && !item.checked ? 
        (<div className='deadline-info'
          style={{ backgroundColor: getTimeRemaining() === 'expired' ? '#e40606bb' : '#e0ba11b3'}}
        >{item.deadline?.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>)
        : null
      }
      <div>
        <button className="update-btn" onClick={() => setUpdateTodoClicked({ clicked: true, todo: item })}><AiFillEdit /></button>
        <button className='delete-btn' onClick={() => handleDelete(item.id)}><AiFillDelete /></button>  
      </div>
    </li>
  )
};

export default TodoItem;
