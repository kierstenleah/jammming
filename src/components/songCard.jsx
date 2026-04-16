import styles from '../css/main.module.css';
import React from 'react';

function SongCard({songName, artistName, imgUrl, addSong, deleteSong, isAdded}){
    
    return (
        <div className={styles.songCard} >
            <div className={styles.albumCover}>
                <img src={imgUrl} height='70' width='70'/>
            </div>
            <div className={styles.songName}>
                <h3>{songName}</h3>
                <h4>{artistName.join(', ')}</h4>
            </div>
            <div className={styles.addButton} >
                {isAdded ? (<button onClick={deleteSong} >-</button>) : (<button onClick={addSong} >+</button>)}
            </div>
        </div>
    )
}

export default SongCard