const Pagination = ({ page, nextPage, prevPage, setPage }) => {
  return (
    <div className='pagination-container'>
      <button className='btn' disabled={!prevPage} onClick={() => setPage(prevPage)}>Previous</button>
      <p className='page-num'>{page}</p>
      <button className='btn' disabled={!nextPage} onClick={() => setPage(nextPage)}>Next</button>
    </div>
  )
};

export default Pagination;
