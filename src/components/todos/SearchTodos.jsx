import { IoSearchOutline } from "react-icons/io5";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { setFilterMode, setSortingMode } from "../../features/todos/todos";

const SearchTodos = ({ searchValue, setSearchValue }) => {
  const todosInfo = useSelector(state => state.todos.value);
  const dispatch = useDispatch();
  const todosOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortingOptions = [
    { value: 'name', label: 'Name'},
    { value: 'date',label: 'Date'}
  ];

  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      border: 0,
      boxShadow: 'none',
      backgroundColor: '#186ca1',
      cursor: 'pointer'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff'
    }),
    dropdownIndicator: base => ({
      ...base,
      color: "white"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#186ca1' : 'inherit',
      cursor: 'pointer',
      '&:hover': { backgroundColor: '#186ca1b5' }
    })
  };

  const handleDisplayChange = (choice) => {
    dispatch(setFilterMode(choice));
  }

  const handleSortingChange = (choice) => {
    dispatch(setSortingMode(choice));
  }

  return (
    <div className='todos-header'>
      <form onSubmit={(e) => e.preventDefault()}>
        <IoSearchOutline className='search-icon' />
        <input
          className='search-field'
          type="search"
          placeholder='Search todo...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <div className="todos-select-div">
        <div className="filter-by">Filter by</div>
        <Select
          className='todos-select'
          options={todosOptions}
          defaultValue={todosInfo.filterMode}
          isSearchable={false}
          onChange={(choice) => handleDisplayChange(choice)}
          styles={selectStyles}
        />
      </div>
      <div className="todos-sorting-div">
        <div className="sort-by">Sort by</div>
        <Select
          className='todos-sorting'
          options={sortingOptions}
          defaultValue={todosInfo.sortingMode}
          isSearchable={false}
          onChange={(choice) => handleSortingChange(choice)}
          styles={selectStyles}
        />
      </div>
    </div>
  )
};

export default SearchTodos;
