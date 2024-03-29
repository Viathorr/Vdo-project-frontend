import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

// ref TodoInfo
const ActivityInfo = ({ name, setName, dayName, setDayName, time, setTime, url, setUrl, handleSubmit, setBtnClicked }) => {
  // add dayName select options and combobox
  return (
    <form className="activity-form">
      <div className='time-picker'>
        <TimePicker
          value={time}
          onChange={(time) => {
            setTime(time);
            console.log(time);
          }}
          disableClock
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
