import {useState} from 'react';
import '../css/main.module.css';
import Search from './search'

function Landing(){


    return(
        <header>
            <h1>JAMMMING</h1>
            <h2>Welcome to Jammming, your new favorite playlist maker.</h2>
            <h2>Search for your jams to get started!</h2>
            <Search />
        </header>
    )
}

export default Landing