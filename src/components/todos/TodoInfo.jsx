import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoInfo = ({ todoName, setTodoName, deadline, setDeadline, handleSubmit, setBtnClicked }) => {
  return (
    <form className='todo-form'>
      <input
        className='todo-name-input'
        type="text"
        placeholder='Todo name(len: 3-50chars)'
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
      />
      <div className='todo-deadline-container'>
        <ReactDatePicker
          selected={deadline}
          minDate={new Date()}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          onChange={date => setDeadline(date)}
          placeholderText='Pick a deadline'
          popperPlacement='right'
          isClearable
          shouldCloseOnSelect={false}
        />
      </div>
      <div>
        <button className='btn' type='button' onClick={() => setBtnClicked({ clicked: false })}>Cancel</button>
        <button
          className='btn'
          type='submit'
          onClick={(e) => handleSubmit(e)}
          disabled={todoName?.length > 3 && todoName?.length < 50 ? false : true}
        >Submit</button>
      </div>
    </form>
  )
};

export default TodoInfo;
