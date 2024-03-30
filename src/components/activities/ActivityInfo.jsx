import { useState } from 'react';
import DropdownList from "react-widgets/DropdownList";
import TimeInput from "react-widgets/TimeInput";
import "react-widgets/styles.css";
import 'react-time-picker/dist/TimePicker.css';

// ref TodoInfo
const ActivityInfo = ({ name, setName, dayName, setDayName, time, setTime, url, setUrl, handleSubmit, setBtnClicked }) => {
  // add dayName select options and combobox
  const [hours, minutes] = time.split(':').map(str => parseInt(str));
  const customDate = new Date();
  customDate.setHours(hours);
  customDate.setMinutes(minutes);
  customDate.setSeconds(0);
  const [date, setDate] = useState(customDate);
  return (
    <form className="activity-form">
      <input
        className='activity-input'
        type="text"
        placeholder='Activity name'
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='activity-input'
        type="text"
        placeholder='Meeting URL (if exists)'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className='day-dropdown-container'>
        <label htmlFor="day-dropdown">Day:</label>
        <DropdownList
          className='dropdown-list'
          id='day-dropdown'
          filter={false}
          defaultValue={dayName}
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
      <div>
        <button className='btn' type='button' onClick={() => setBtnClicked({ clicked: false })}>Cancel</button>
        <button className='btn' type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </form>
  )
};

export default ActivityInfo;
