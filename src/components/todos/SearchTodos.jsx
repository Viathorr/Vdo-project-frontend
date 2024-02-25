import React from 'react';
import { IoSearchOutline, IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import Select from 'react-select';

const SearchTodos = ({ setDisplayMode, searchValue, setSearchValue, mode, setMode }) => {
  const todosOptions = [
    { value: 'all', label: 'ALL' },
    { value: 'active', label: 'ACTIVE' },
    { value: 'completed', label: 'COMPLETED' }
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

  const handleDisplayChange = (value) => {
    setDisplayMode(value);
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
      <Select
        className='todos-select'
        options={todosOptions}
        defaultValue={todosOptions[0]}
        isSearchable={false}
        onChange={(choice) => handleDisplayChange(choice.value)}
        styles={selectStyles}
      />
      <button className='mode-btn' onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')}>
        { mode === 'light' ? <IoSunnyOutline /> : <IoMoonOutline /> }
      </button>
    </div>
  )
};

export default SearchTodos;
