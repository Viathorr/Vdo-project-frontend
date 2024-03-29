import { useEffect, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DayCard from "../components/classes/DayCard";
import { FaPlus } from "react-icons/fa6";
import AddActivity from "../components/activities/AddActivity";

const Classes = () => {
  const { data, isLoading, fetchError } = useAxiosFetch('/schedule');
  const weekDays = [
    {
      id: 1,
      dayName: 'Monday',
      activities: []
    },
    {
      id: 2,
      dayName: 'Tuesday',
      activities: []
    },
    {
      id: 3,
      dayName: 'Wednesday',
      activities: []
    },
    {
      id: 4,
      dayName: 'Thursday',
      activities: []
    },
    {
      id: 5,
      dayName: 'Friday',
      activities: []
    },
    {
      id: 6,
      dayName: 'Saturday',
      activities: []
    },
    {
      id: 7,
      dayName: 'Sunday',
      activities: []
    },
  ];
  const [addActivityClicked, setAddActivityClicked] = useState({ clicked: false});
  const [days, setDays] = useState([]);
  const axiosJWT = useAxiosPrivate();

  useEffect(() => {
    setDays(data);
  }, [data]);

  const fetchActivities = async () => {
    return;
  };

  const toggleAddActivityClicked = () => {
    setAddActivityClicked(prev => ({ clicked: !(prev.clicked)}));
  };
 
  return (
    <div className="classes-container">
      <h1 className="title">Schedule</h1>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {/* {
        !isLoading && !fetchError && 
            <div className="days-container">
            {days?.length > 0 ?
              days.map(day => (
                <DayCard key={day.id} day={day} />
              ))
              : ( <h1>No schedule yet.</h1> )
            }
          </div>
      } */}
      {
        !isLoading && !fetchError && 
            <div className="days-container">
            { 
              weekDays.map(day => (
                <DayCard key={day.id} day={day} />
              ))
            }
          </div>
      }
      <AddActivity addActivityClicked={addActivityClicked} setAddActivityClicked={setAddActivityClicked} fetchActivities={fetchActivities}/>
      <div className='add-btn-container'>
        <button className='add-btn' onClick={() => toggleAddActivityClicked()}><FaPlus /></button>
      </div>
    </div>
  )
};

export default Classes;
 