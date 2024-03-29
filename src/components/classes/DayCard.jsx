import React from 'react';

const DayCard = ({ day }) => {
  const keys = [1, 2, 3, 4, 5];
  return (
    <div key={day.id} className='day-card'>
      <div className='day-name'>
        <p>{day.dayName}</p>
      </div>
      {/* <div className='day-subjects'>
        {day.classes.map(subject => (
          <div className='subject' key={k++}>
            <span className='class-time'>{subject.beginningTime} - {subject.endTime} </span>
            <a className='subject-name' href={subject.url} target="_blank" rel="noopener noreferrer">{subject.subject}</a>
            <span className='class-type'>{subject.type}</span>
          </div>
        ))}
      </div> */}
      <div className='day-subjects'>
        { day.activities.length ? day.activities.map(activity => (
          <div className='subject' key={activity.id}>
            <span className='class-time'>{activity.beginningTime} - {activity.endTime} </span>
            <a className='subject-name' href={activity.url} target="_blank" rel="noopener noreferrer">{activity.subject}</a>
            <span className='class-type'>{activity.type}</span>
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
