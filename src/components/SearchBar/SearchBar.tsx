import React from 'react';
import classes from './SearchBar.module.css';

interface SearchBarProps {
    searchTerm: string;
    placeholder: string;
    onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;
    buttonText: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, placeholder, onSearchTermChange, onSearch, buttonText }) => {
    return (
        <div className={classes.search_container}>
            <input
                type="text"
                placeholder={placeholder}
                className={classes.search_input}
                value={searchTerm}
                onChange={onSearchTermChange}
            />
            <button className={classes.search_button} onClick={onSearch}>
                {buttonText}
            </button>
        </div>
    );
};

export default SearchBar;
