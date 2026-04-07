import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import styles from './css/main.module.css';
import Landing from './components/landing';
import Search from './components/search';
import ResultsPage from './components/results';

function App() {

  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState('');
  const [auth, setAuth] = useState('');
  const [results, setResults] = useState('');

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

  async function getData(input, offset, limit){
    const url=`https://api.spotify.com/v1/search?q=${input}&type=album%2Ctrack%2Cartist&offset=${offset}&limit=${limit}`;

    const response = await fetch(url, {
        headers: {
        "Authorization": `Bearer ${auth}`
      }
    });
    const result = await response.json();
    setResults(result);
    }

  function handleChange(e){
      e.preventDefault();
      const newValue = e.target.value
      setInput(newValue);
      if (showResults===false){
        setShowResults(true);
      }
      try{
        getData(newValue,0,10);
      } catch(e){
        console.log(e)
      }
      
    }


  return showResults ? (<ResultsPage handleChange={handleChange} searchInput={input} results= {results}/>) : (<Landing onInput={handleChange}/>)
  
}

export default App
