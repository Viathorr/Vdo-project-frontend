import React from 'react';

const DayCard = ({ day }) => {
  let k = 0;
  return (
    <div key={day.id} className='day-card'>
      <div className='day-name'>
        <p>{day.dayName}</p>
      </div>
      <div className='day-subjects'>
        {day.classes.map(subject => (
          <div className='subject' key={k++}>
            <span className='class-time'>{subject.beginningTime} - {subject.endTime} </span>
            <a className='subject-name' href={subject.url} target="_blank" rel="noopener noreferrer">{subject.subject}</a>
            <span className='class-type'>{subject.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export default DayCard;
