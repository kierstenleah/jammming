import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import styles from './css/main.module.css';
import Landing from './components/landing';
import ResultsPage from './components/results';
import SaveForm from './components/SaveForm';

function App() {

  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState('');
  const [auth, setAuth] = useState('');
  const [results, setResults] = useState('');
  const [offset, setOffset] = useState(0);
  const [showSaveForm, setShowSaveForm] = useState(false)

  useEffect(()=>{
    async function getAuth(){
      const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&client_id=cee2d5050ae84df08c8f396ad122899a&client_secret=92d9574c30e447a7bd5c726070f65900&redirect_uri=http://localhost:5173/callback&"
    });
    const authObject = await response.json();
    setAuth(authObject.access_token)
    }
    getAuth();
  }, [])

  async function getData(input, offset){
    if(!input){
      return
    }
    const url=`https://api.spotify.com/v1/search?q=${input}&type=track&offset=${offset}&limit=10`;

    const response = await fetch(url, {
        headers: {
        "Authorization": `Bearer ${auth}`
      }
    });
    setOffset(offset+10);
    const newResults = await response.json();
    

    return newResults
  }

  function handleChange(e){
      e.preventDefault();
      const newValue = e.target.value
      setInput(newValue);
      if (showResults===false){
        setShowResults(true);
      }
      try{
        getData(newValue,0).then(response => setResults(response?.tracks?.items))
      } catch(e){
        console.log(e)
      }
      
    }

  const [playlistName, setPlaylistName] = useState('')
  function handleNameChange(e){
      e.preventDefault();
      setPlaylistName(e.target.value);
  }

  function showMore() { 
    getData(input, offset).then(response=> setResults(prev=>([...prev, ...response?.tracks?.items])))
  };

  const [addedSongs, setAddedSongs] = useState([])

  function addSong(song){
      const newSong = JSON.parse(song);
      if(addedSongs.some((song)=>JSON.stringify(song)===JSON.stringify(newSong))){
          return
      }else{
          if(addedSongs.length>0){
          setAddedSongs(prev=>([...prev, newSong]));
          } else{
              setAddedSongs([newSong])
          }
      }
  };

  function deleteSong(song){
      const deletedSong = JSON.parse(song)
      setAddedSongs(prev=> prev.filter((prevItem)=>JSON.stringify(prevItem)!==JSON.stringify(deletedSong)));
      console.log(addedSongs)
  }

  const [userId, setUserId] = useState('');

  function handleUserId(e){
    e.preventDefault();
    setUserId(e.target.value)
    console.log(e.target.value)
  }

  async function createPlaylist(userId, songs){
    
  }

  if(showSaveForm){
    return <SaveForm closeSaveForm={()=>setShowSaveForm(false)} addedSongs={addedSongs} handleSubmit={()=>createPlaylist(userId, addedSongs)} handleUserId={handleUserId} playlistName={playlistName}/>
  }

  return showResults ? (
  <ResultsPage handleChange={handleChange} searchInput={input} results={results} showMore={showMore} showSaveForm={()=>setShowSaveForm(true)} addedSongs={addedSongs} addSong={addSong} deleteSong={deleteSong} handleNameChange={handleNameChange}/>
) : (<Landing onInput={handleChange}/>)
  
}

export default App
