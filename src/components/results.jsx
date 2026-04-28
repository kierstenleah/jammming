import styles from '../css/main.module.css';
import {useState} from 'react';
import Search from './search';
import { motion } from "motion/react";
import SongCard from './songCard';



function ResultsPage({handleChange, searchInput, results, showMore, addSong, deleteSong, addedSongs, handleNameChange, playlistName, handleSubmit}){


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
                        results?.map((track, index)=> <SongCard key={index} songName={track?.name} artistName={track?.artists?.map(artist=> artist.name)} imgUrl={track?.album?.images[0]?.url} addSong={()=>addSong(JSON.stringify(track))} />)
                        ) : (
                        <p>Loading results...</p>
                        )}
                        
                        <button onClick={showMore} className={styles.submitBtn}>Show more</button>
                    </section>

                    <section className={styles.playlist}>
                        <input type='text' placeholder='New Playlist' className={styles.playlistName} onChange={handleNameChange} value={playlistName}/>
                        {addedSongs.length>0 ? (
                        addedSongs?.map((track, index)=> <SongCard key={index} songName={track?.name} artistName={track?.artists?.map(artist=> artist.name)} imgUrl={track?.album?.images[0]?.url} isAdded={true} deleteSong={()=>deleteSong(JSON.stringify(track))}/>)
                        ) : (
                        <p>Add jams to your playlist!</p>
                        )}
                        <button onClick={handleSubmit} className={styles.submitBtn}>Save to Spotify</button>
                </section>
                </div>
            </motion.div>
        </div>
        
    )
}

export default ResultsPage