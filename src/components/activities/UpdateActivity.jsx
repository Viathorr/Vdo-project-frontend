import { useState } from "react";
import ActivityInfo from "./ActivityInfo";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateActivity = ({ updateActivityClicked, setUpdateActivityClicked, fetchActivities }) => {
  const [name, setName] = useState(updateActivityClicked.activity?.name);
  const [dayName, setDayName] = useState(updateActivityClicked.activity?.day);
  const [time, setTime] = useState(updateActivityClicked.activity?.time);
  const [url, setUrl] = useState(updateActivityClicked.activity?.url ? updateActivityClicked.activity.url : '');
  const axiosJWT = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`Activity info: ${name}, ${dayName}, ${time}, ${url}`);
    } catch (err) {
      console.log(`Error: ${err}`);
    }

    setName('');
    setDayName('');
    setTime('');
    setUrl('');
    setUpdateActivityClicked({ clicked: false});
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
        />
      </div>
    </div>
  )
};

export default UpdateActivity;
