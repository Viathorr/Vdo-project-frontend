import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const DayCard = ({ day, setUpdateActivityClicked, fetchActivities }) => {
  const keys = [1, 2, 3, 4, 5];
  const axiosJWT = useAxiosPrivate();

  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(`/schedule?activity_id=${id}`);
      await fetchActivities();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div key={day.id} className='day-card'>
      <div className='day-name'>
        <p>{day.dayName}</p>
      </div>
      <div className='day-subjects'>
        { day.activities.length ? day.activities.map(activity => (
          <div className={`subject ${activity.id ? 'non-empty' : 'empty'}`} key={activity.id}>
            <span className='class-time'>{activity.time}</span>
            {activity.url ? (
              <a className='subject-name' href={activity.url} target="_blank" rel="noopener noreferrer">{activity.name}</a>
            ) :
              <p className='subject-name'>{activity.name}</p>
            }
            { activity.id ? (
              <div className='btns-container'>
                <button className='update-btn' onClick={() => setUpdateActivityClicked({ clicked: true, activity: { ...activity, day: day.dayName }})}><AiFillEdit /></button>
                <button className='delete-btn' onClick={() => handleDelete(activity.id)}><AiFillDelete /></button>  
              </div>
            ) : null
            }
          </div>
        )) : (
            keys.map(id => (
              <div className='subject empty' key={id}>
              </div>
            ))
          ) 
        }
      </div>
    </div>
  )
};

export default DayCard;
