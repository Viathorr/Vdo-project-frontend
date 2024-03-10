import { useState } from 'react';
import TodoInfo from './TodoInfo';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const AddTodo = ({ addTodoClicked, setAddTodoClicked, fetchTodos }) => {
  const [todoName, setTodoName] = useState('');
  const [deadline, setDeadline] = useState(null); 
  const axiosJWT = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post('/todos', { name: todoName, deadline });
      await fetchTodos();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
     
    setTodoName('');
    setDeadline(null);
    setAddTodoClicked({ clicked: false});
  };

  return (
    <div className={addTodoClicked.clicked ? 'todo-window open' : 'todo-window'}>
      <div className='todo-content'>
        <h2 className='todo-info-title'>ADD TODO</h2>
        <TodoInfo
          todoName={todoName}
          setTodoName={setTodoName}
          deadline={deadline}
          setDeadline={setDeadline}
          handleSubmit={handleSubmit}
          setBtnClicked={setAddTodoClicked}
        />
      </div>
    </div>
  )
};

export default AddTodo;
