import styles from '../css/main.module.css';
import React from 'react';

function SongCard({songName, artistName, imgUrl}){
    
    return (
        <div className={styles.songCard}>
            <div className={styles.albumCover}>
                <img src={imgUrl} height='70' width='70'/>
            </div>
            <div className={styles.songName}>
                <h3>{songName}</h3>
                <h4>{artistName.join(', ')}</h4>
            </div>
            <div className={styles.addButton}>
                <span>+</span>
            </div>
        </div>
    )
}

export default SongCard