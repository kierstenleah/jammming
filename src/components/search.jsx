import styles from '../css/main.module.css';
import React from 'react';

function Search({onInput, value}){

    return(
        <input className={styles.search} name='search' type='text' placeholder='Search' onChange={onInput} value={value} autoFocus/>
    )
}

export default Search