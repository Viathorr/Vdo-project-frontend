import { useEffect, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DayCard from "../components/classes/DayCard";
import { FaPlus } from "react-icons/fa6";
import AddActivity from "../components/activities/AddActivity";
import UpdateActivity from "../components/activities/UpdateActivity";

const API_URL = '/schedule';

const Classes = () => {
  const { data, isLoading, fetchError, setData } = useAxiosFetch(API_URL);
  const [weekDays, setWeekDays] = useState([{
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
  }]);
  const [addActivityClicked, setAddActivityClicked] = useState({ clicked: false });
  const [updateActivityClicked, setUpdateActivityClicked] = useState({ clicked: false, activity: null });
  const axiosJWT = useAxiosPrivate();

  useEffect(() => {
    setWeekDays(prev => prev.map(
      day => {
      const diff = 5 - (data[day.dayName] ? data[day.dayName] : []).length;
      day.activities = data[day.dayName] ? data[day.dayName] : [];
      for (let i = 0; i < diff; i++) {
        (day.activities).push({});
      }
      return day;
    })
  );
  }, [data]);

  const fetchActivities = async () => {
    const response = await axiosJWT.get(API_URL);
    setData(response.data ? response.data : {});
  };

  const toggleAddActivityClicked = () => {
    setAddActivityClicked(prev => ({ clicked: !(prev.clicked)}));
  };
 
  return (
    <div className="classes-container">
      <h1 className="title">Schedule</h1>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {
        !isLoading && !fetchError && 
            <div className="days-container">
            { 
              weekDays.map(day => (
                <DayCard key={day.id} day={day} setUpdateActivityClicked={setUpdateActivityClicked} fetchActivities={fetchActivities}/>
              ))
            }
          </div>
      }
      <AddActivity addActivityClicked={addActivityClicked} setAddActivityClicked={setAddActivityClicked} fetchActivities={fetchActivities} />
      {updateActivityClicked.clicked ? (
        <UpdateActivity updateActivityClicked={updateActivityClicked} setUpdateActivityClicked={setUpdateActivityClicked} fetchActivities={fetchActivities}/>
      ) :
        null
      }
      <div className='add-btn-container'>
        <button className='add-btn' onClick={() => toggleAddActivityClicked()}><FaPlus /></button>
      </div>
    </div>
  )
};

export default Classes;
 