import { useState } from 'react';
import DropdownList from "react-widgets/DropdownList";
import TimeInput from "react-widgets/TimeInput";
import "react-widgets/styles.css";
import 'react-time-picker/dist/TimePicker.css';

const ActivityInfo = ({ name, setName, dayName, setDayName, time, setTime, url, setUrl, handleSubmit, setBtnClicked, error, setError }) => {
  const [hours, minutes] = time.split(':').map(str => parseInt(str));
  const customDate = new Date();
  customDate.setHours(hours);
  customDate.setMinutes(minutes);
  customDate.setSeconds(0);
  const [date, setDate] = useState(customDate);
  return (
    <form className="activity-form">
      <div className='input-div'>
        <label htmlFor="activity-name">Name:</label>
        <input
          id='activity-name'
          className='activity-input'
          type="text"
          placeholder='Activity name(len: 3-35chars)'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='input-div'>
        <label htmlFor="activity-url">URL:</label>
        <input
          id='activity-url'
          className='activity-input'
          type="text"
          autoComplete='off'
          placeholder='Meeting URL (if exists)'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className='day-dropdown-container'>
        <label htmlFor="day-dropdown">Day:</label>
        <DropdownList
          className='dropdown-list'
          id='day-dropdown'
          filter={false}
          value={dayName}
          data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
          onChange={value => setDayName(value)}
        />
      </div>
      <div className='time-picker-container'>
        <label htmlFor="time-picker">Time:</label>
        <TimeInput
          className='time-picker'
          id='time-picker'
          value={date}
          onChange={(date) => {
            setDate(date);
            setTime(date.toTimeString().split(' ')[0].slice(0, 5));
          }}
        />
      </div>
      { error ? <p className='error-msg' style={{ color: 'red' }}>{error}</p> : null }
      <div>
        <button className='btn' type='button' onClick={() => {
          setBtnClicked({ clicked: false });
          setError('');
        }}>Cancel</button>
        <button
          className='btn'
          type='submit'
          disabled={name?.length > 3 && name?.length < 35 ? false : true}
          onClick={(e) => handleSubmit(e)}
        >Submit</button>
      </div>
    </form>
  )
};

export default ActivityInfo;
