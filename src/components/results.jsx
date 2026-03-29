import '../css/main.module.css'

function ResultsPage(){
    return(
        <div>
            <input></input>
        
            <div className='results-container'>
                <section className='results'>
                    <h2>Results</h2>

                </section>

                <section className='playlist'>
                    <input type='text' placeholder='New Playlist' className='playlist-name' />

            </section>
            </div>
        </div>
    )
}

export default ResultsPage