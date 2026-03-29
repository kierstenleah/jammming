import '../css/main.module.css';
import{useState} from 'react'

function Search(){

    const [input, setInput] = useState('');

    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value)
    }

    return(
        <input type='text' placeholder='Search' onChange={handleChange} value={input}/>
    )
}

export default Search