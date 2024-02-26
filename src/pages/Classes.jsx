import { useEffect, useState } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import DayCard from "../components/classes/DayCard";

const Classes = () => {
  const { data, isLoading, fetchError } = useAxiosFetch('/schedule');
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(data);
  }, [data]);

  return (
    <div className="classes-container">
      <h1 className="title">Schedule</h1>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {
        !isLoading && !fetchError && 
            <div className="days-container">
            {days?.length > 0 ?
              days.map(day => (
                <DayCard key={day.id} day={day} />
              ))
              : ( <h1>No schedule yet.</h1> )
            }
          </div>
      }
    </div>
  )
};

export default Classes;
 