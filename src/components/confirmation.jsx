import styles from '../css/main.module.css'

function Confirmation({playlistURL}){
    return (
        <div>
            <h1 className={styles.heading}>JAMMMING</h1>
            <div className={styles.confContainer}>
                <h2 className={styles.confHeader}>Playlist Saved!</h2>
                <p>Enjoy your new tunes or make more playlists!</p>
                <div className={styles.btnContainer}>
                    <button onClick={()=>window.open(playlistURL, '_blank')} className={styles.confBtn}>View playlist</button>
                    <button onClick={()=>window.open('/', '_blank')} className={styles.confBtn}>Create new playlist</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation