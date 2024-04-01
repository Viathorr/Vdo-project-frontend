import { useState } from "react";
import ActivityInfo from "./ActivityInfo";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateActivity = ({ updateActivityClicked, setUpdateActivityClicked, fetchActivities }) => {
  const [error, setError] = useState('');
  const [name, setName] = useState(updateActivityClicked.activity?.name);
  const [dayName, setDayName] = useState(updateActivityClicked.activity?.day);
  const [time, setTime] = useState(updateActivityClicked.activity?.time);
  const [url, setUrl] = useState(updateActivityClicked.activity?.url ? updateActivityClicked.activity.url : '');
  const axiosJWT = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosJWT.put(`/schedule?activity_id=${updateActivityClicked.activity.id}`, { name, dayName, time, url });
      await fetchActivities();
      setUpdateActivityClicked({ clicked: false });
    } catch (err) {
      setError(err.response.data.message);
    }
 
    setName('');
    setDayName('Monday');
    setTime('10:00');
    setUrl('');
  };
 
  return (
    <div className={updateActivityClicked.clicked ? 'activity-window open' : 'activity-window'}>
      <div className='activity-content'>
        <h2 className='activity-info-title'>UPDATE ACTIVITY</h2>
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
          setBtnClicked={setUpdateActivityClicked}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  )
};

export default UpdateActivity;
