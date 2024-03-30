import { useEffect, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DayCard from "../components/classes/DayCard";
import { FaPlus } from "react-icons/fa6";
import AddActivity from "../components/activities/AddActivity";
import UpdateActivity from "../components/activities/UpdateActivity";

const Classes = () => {
  const { data, isLoading, fetchError } = useAxiosFetch('/schedule');
  const weekDays = [
    {
      id: 1,
      dayName: 'Monday',
      activities: [
        {
          id: 1,
          name: 'Something',
          time: '10:00',
          url: 'http://localhost:3000'
        },
        {
          id: 2,
          name: 'Smth else',
          time: '12:00',
          url: ''
        },
        {
          id: 3,
          name: 'Smth else 3',
          time: '14:00',
          url: ''
        }, {}, {}
      ]
    },
    {
      id: 2,
      dayName: 'Tuesday',
      activities: [
        {
          id: 43,
          name: 'Something',
          time: '10:00',
          url: 'http://localhost:3000'
        },
        {
          id: 212,
          name: 'Smth else',
          time: '12:00',
          url: ''
        },
        {
          id: 32,
          name: 'Smth else 3',
          time: '14:00',
          url: ''
        }, {}, {}
      ]
    },
    {
      id: 3,
      dayName: 'Wednesday',
      activities: [
        {
          id: 11,
          name: 'Something',
          time: '10:00',
          url: 'http://localhost:3000'
        },
        {
          id: 22,
          name: 'Smth else',
          time: '11:00',
          url: ''
        },
        {
          id: 331,
          name: 'Smth else 3',
          time: '16:00',
          url: ''
        }, {}, {}
      ]
    },
    {
      id: 4,
      dayName: 'Thursday',
      activities: [
        {
          id: 12,
          name: 'Something',
          time: '14:00',
          url: 'http://localhost:3000'
        },
        {
          id: 215,
          name: 'Smth else',
          time: '22:00',
          url: ''
        },
        {}, {}, {}
      ]
    },
    {
      id: 5,
      dayName: 'Friday',
      activities: []
    },
    {
      id: 6,
      dayName: 'Saturday',
      activities: [
        {
          id: 109,
          name: 'Something',
          time: '10:00',
          url: 'http://localhost:3000'
        },
        {
          id: 28,
          name: 'Smth else',
          time: '17:00',
          url: ''
        },
        {}, {}, {}
      ]
    },
    {
      id: 7,
      dayName: 'Sunday',
      activities: []
    },
  ];
  const [addActivityClicked, setAddActivityClicked] = useState({ clicked: false });
  const [updateActivityClicked, setUpdateActivityClicked] = useState({ clicked: false, activity: null });
  // const [updateActivityClicked, setUpdateActivityClicked] = useState({
  //   clicked: true, activity: {
  //     name: 'Smth',
  //     day: 'Friday',
  //     time: '10:00',
  //     url: 'http://localhost:4000'
  // } });
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
 