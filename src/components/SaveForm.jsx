import React from 'react';
import styles from '../css/main.module.css'

function SaveForm({userId, closeSaveForm, handleSubmit, handleUserId, handleNameChange, playlistName}){
    return(
        <>
        <h1 className={styles.heading}>JAMMMING</h1>
            <div className={styles.saveForm}>
                <button onClick={closeSaveForm} className={styles.backBtn}>←</button>
                <h2>Save to Spotify</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formContainer}>
                        <div className={styles.labels}>
                            <label htmlFor='userId'>Spotify username: </label>
                            <label htmlFor='playlistName'>Playlist name: </label>
                        </div>
                        <div className={styles.inputs}>
                            <input type='text' id='userId' name='userId' value={userId} onChange={handleUserId} required />
                            <input type='text' name='playlistName' value={playlistName} onChange={handleNameChange} required />
                        </div>
                    </div>
                    
                    <button type='submit' className={styles.submitBtn}>Save your playlist!</button>
                </form>
            </div>
        </>
    )
}

export default SaveForm



