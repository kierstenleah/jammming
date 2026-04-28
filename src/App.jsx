import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './App.css';
import Landing from './components/landing';
import ResultsPage from './components/results';
import Confirmation from './components/confirmation'
import { Buffer } from 'buffer';
window.Buffer = Buffer;



function App() {

  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState('');
  const [auth, setAuth] = useState('');
  const [results, setResults] = useState('');
  const [offset, setOffset] = useState(0);


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

  const isMounted = useRef(false);

  useEffect(()=>{  // waits for redirect to complete to begin next step
    if(window.location.search.includes('code') && !isMounted.current){
      getAccessToken()
    }
    isMounted.current=true;
  }, [])

  async function getData(input, offset){  // fetches results from search input
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

  function handleChange(e){  // saves search input and calls fetch function
      e.preventDefault();
      const newValue = e.target.value
      setInput(newValue);
      if (showResults===false){ // opens results page on initial input
        setShowResults(true);
      }
      try{
        getData(newValue,0).then(response => setResults(response?.tracks?.items))
      } catch(e){
        console.log(e)
      }
      
    }

  const [playlistName, setPlaylistName] = useState('')
  function handleNameChange(e){ // updates users playlist name
      e.preventDefault();
      setPlaylistName(e.target.value);
  }

  function showMore() { // allows user to load more results
    getData(input, offset).then(response=> setResults(prev=>([...prev, ...response?.tracks?.items])))
  };

  const [addedSongs, setAddedSongs] = useState([])

  function addSong(song){ // stores added songs
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
  }

  function deleteSong(song){ // deletes a song
      const deletedSong = JSON.parse(song)
      setAddedSongs(prev=> prev.filter((prevItem)=>JSON.stringify(prevItem)!==JSON.stringify(deletedSong)));
      console.log(addedSongs)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function redirect(){  //brings user to spotify login page

    localStorage.setItem('pendingPlaylistName', playlistName);
    localStorage.setItem('playlistItems', JSON.stringify(addedSongs));

    const redirectUrl = 'https://accounts.spotify.com/authorize?client_id=cee2d5050ae84df08c8f396ad122899a&response_type=code&client_secret=92d9574c30e447a7bd5c726070f65900&redirect_uri=http://127.0.0.1:5173/callback&scope=playlist-modify-public';
    try{
      window.location.assign(redirectUrl);
    }catch(e){
      console.log(e)
    };
  };

  async function getAccessToken(){ // retrieves authorization from spotify API
    setIsLoggedIn(true);
    
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const clientSecret = "92d9574c30e447a7bd5c726070f65900";
    const clientId = "cee2d5050ae84df08c8f396ad122899a";
    const authEncoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    try{
      const url="https://accounts.spotify.com/api/token";
      let response = await fetch(url,{
        method: 'POST',
        body: "grant_type=authorization_code&code="+code+"&redirect_uri=http://127.0.0.1:5173/callback",
        headers:{
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${authEncoded}`
      }
      });
      response = await response.json();
      console.log("response: "+response.access_token);
      createPlaylist(response.access_token)
      
    } catch(e){
      console.log(e)
    }
  }

  async function createPlaylist(result){
    const name = localStorage.getItem('pendingPlaylistName') || 'New Playlist';
    const accessToken = result;
    const url = "https://api.spotify.com/v1/me/playlists";
    console.log(playlistName)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"name": name})
    })
    const result2 = await response.json();

    addSongs(result2, accessToken)
  }

  const [playlistURL, setPlaylistURL] = useState('spotify.com')
  async function addSongs(result, accessToken){
    const id = result.id;
    setPlaylistURL(result.external_urls.spotify)
    let playlistItems = localStorage.getItem('playlistItems');
    playlistItems = JSON.parse(playlistItems);
    console.log(playlistItems)
    const playlistUris = [];
    playlistItems.forEach(song=>playlistUris.push(song.uri));
    console.log(playlistUris);
    const url = "https://api.spotify.com/v1/playlists/"+id+"/items";
    const response = await fetch(url,{
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({uris:playlistUris})
    })
    console.log(response)
  }

  
  if(isLoggedIn){
    return  <Confirmation playlistURL={playlistURL}/>
  }

  return showResults ? (
  <ResultsPage handleChange={handleChange} searchInput={input} results={results} showMore={showMore} addedSongs={addedSongs} addSong={addSong} deleteSong={deleteSong} handleNameChange={handleNameChange} handleSubmit={(e)=> {e.preventDefault(); redirect()}}/>
  ) : (<Landing onInput={handleChange}/>)
  
}

export default App
