import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckTodo, deleteTodo } from '../../features/todos/todos';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
 
const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.value);
  const axiosJWT = useAxiosPrivate();

  const handleCheck = async (id) => {
    const neededTodo = todos.find(todo => todo.id === id);
    const updatedTodo = { ...neededTodo, checked: !neededTodo.checked };
    try {
      await axiosJWT.put(`/todos/${id}`, updatedTodo);
      dispatch(toggleCheckTodo(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(`/todos/${id}`);
      dispatch(deleteTodo(id));
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
      <button className='delete-btn' onClick={() => handleDelete(item.id)}><AiFillDelete /></button>
    </li>
  )
};

export default TodoItem;
