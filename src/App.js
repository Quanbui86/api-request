import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [json, setJson] = useState('')
  useEffect(()=>{
    generateJson()
  },[])
  const generateJson = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if(response.ok){
        const jsonResponse = await response.json();
        setJson(formatJson(jsonResponse))
      }
    } catch(error) {
      console.log(error);
    }
  };
  // Format returned promise data
const formatJson = (resJson) => {
  resJson = JSON.stringify(resJson);
 let counter = 0;
  return resJson.split('').map(char => {
    switch (char) {
      case ',':
        return `,\n${' '.repeat(counter * 5)}`;
      case '{':
        counter += 1;
        return `{\n${' '.repeat(counter * 5)}`;
      case '}':
        counter -= 1;
        return `\n${' '.repeat(counter * 5)}}`;
      default:
        return char;
    }
  })
  .join('');
};
  
  return (
    <div className="App">
      <header className="App-header">
        <pre>
          {json}
        </pre>
      </header>
    </div>
  );
}

export default App;
