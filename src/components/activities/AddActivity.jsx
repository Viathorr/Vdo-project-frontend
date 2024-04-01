import { useState } from "react";
import ActivityInfo from "./ActivityInfo";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddActivity = ({ addActivityClicked, setAddActivityClicked, fetchActivities }) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [dayName, setDayName] = useState('Monday');
  const [time, setTime] = useState('10:00');
  const [url, setUrl] = useState('');
  const axiosJWT = useAxiosPrivate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosJWT.post('/schedule', { name, dayName, time, url });
      await fetchActivities();
      setError('');
      setAddActivityClicked({ clicked: false });
    } catch (err) {
      setError(err.response.data.message);
    }

    setName('');
    setDayName('Monday');
    setTime('10:00');
    setUrl('');
  };
 
  return (
    <div className={addActivityClicked.clicked ? 'activity-window open' : 'activity-window'}>
      <div className='activity-content'>
        <h2 className='activity-info-title'>ADD ACTIVITY</h2>
        <ActivityInfo
          name={name}
          setName={setName}
          dayName={dayName}
          setDayName={setDayName}
          time={time}
          setTime={setTime}
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
          setBtnClicked={setAddActivityClicked}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  )
};

export default AddActivity;
