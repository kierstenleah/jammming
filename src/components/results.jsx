import styles from '../css/main.module.css';
import React from 'react';
import Search from './search';
import { motion } from "motion/react";
import SongCard from './songCard';


function ResultsPage({handleChange, searchInput, results}){

    return(
        <div className={styles.resultsPage}>
            <h1 className={styles.heading}>JAMMMING</h1>
            <motion.div initial={{y:500}}
        animate={{y:0}}
        transition={{ease:'linear', duration:.25}} className={styles.motionDiv}>
                <Search onInput={handleChange} value={searchInput} />
            
                <div className={styles.resultsContainer}>
                    <section className={styles.results}>
                        <h2>Results</h2>
                        {results ? (
                        results?.tracks?.items?.map((track, index)=> <SongCard key={index} songName={track?.name} artistName={track?.artists.map(artist=> artist.name)} imgUrl={track?.album.images[0].url}/>)
                        ) : (
                        <p>Loading results...</p>
                        )}
                        

                    </section>

                    <section className={styles.playlist}>
                        <input type='text' placeholder='New Playlist' className={styles.playlistName} />

                </section>
                </div>
            </motion.div>
        </div>
    )
}

export default ResultsPage