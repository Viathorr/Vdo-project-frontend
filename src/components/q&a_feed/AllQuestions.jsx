import { useState, useEffect } from 'react';
import Pagination from '../Pagination';

const AllQuestions = () => {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  return (
    <div style={{ marginTop: '10rem'}}>
      All Questions
      {/* <Pagination page={page} nextPage={nextPage} prevPage={prevPage} setPage={setPage} /> */}
    </div>
  )
}

export default AllQuestions
