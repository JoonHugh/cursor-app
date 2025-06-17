import { useState, useRef, useEffect } from 'react';
import styles from './FilterDropdown.module.css';
import { IoFilter } from "react-icons/io5";


function FilterDropdown({ filters, onFilterChange }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [])

    const toggleFilter = (filter) => {
        const  newFilters = selectedFilters.includes(filter)
            ? selectedFilters.filter(f => f !== filter)
            : [...selectedFilters, filter];

            setSelectedFilters(newFilters);
            onFilterChange(newFilters)
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
        onFilterChange([]);
    }

    return(
        <div className={styles["dropdown-container"]} ref={dropdownRef}>
            <button 
                className={styles["filter-button"]}
                onClick={() => setIsOpen(!isOpen)}
                >
                <IoFilter />
                <span>Filter</span>
            </button>

            {isOpen && (
                <div className={styles["dropdown-menu"]}>
                    <span>Filter by Category</span>
                    <div className={styles["filter-grid"]}>
                        {filters.map((filter) => {
                            const isChecked = selectedFilters.includes(filter.value);

                            return (
                                <div key={filter.value} className={`${styles["filter-item"]} ${isChecked ? styles.checked : ''}`}>
                                    <label className={styles["testing"]}>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleFilter(filter.value)}
                                            />
                                        {filter.icon} {filter.label}
                                    </label>
                                </div>
                            )})}
                    </div>
                    <button 
                        className={styles["clear-all"]}
                        onClick={clearAllFilters}
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
}

export default FilterDropdown