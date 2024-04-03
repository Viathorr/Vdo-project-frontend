const NavigationSideBar = ({ activeLink, setActiveLink }) => {
  return (
    <div className="navigation-sidebar">
      <button
        onClick={() => setActiveLink('/all_questions')}
        className={activeLink === '/all_questions' ? 'btn btn-active' : 'btn'}
      >All Questions</button>
      <button
        onClick={() => setActiveLink('/my_questions')}
        className={activeLink === '/my_questions' ? 'btn btn-active' : 'btn'}
      >My Questions</button>
      <button
        onClick={() => setActiveLink('/saved_questions')}
        className={activeLink === '/saved_questions' ? 'btn btn-active' : 'btn'}
      >Saved Questions</button>
    </div>
  )
};

export default NavigationSideBar;
