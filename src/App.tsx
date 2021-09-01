import React, {useState} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [files,setFiles] = useState<any>()
  function handleOnChange(e:any){
    // console.log('file: ',e.target.files[0])
    setFiles(e.target.files[0])
  }
  async function handleSubmit(e:any){
    e.preventDefault()
    let getUploadURL = await getURL()
    console.log('get upload url: ',getUploadURL)
    let uploadFile = await upload(getUploadURL)
    console.log('upload File: ',uploadFile)
  }
  async function getURL(){
    try{
      const response = (await axios.get('https://xrglztnix0.execute-api.eu-central-1.amazonaws.com/uploads')).data.uploadURL
      // console.log('response: ',response)
    return response
    }catch (error){
      console.error(error)
    }
  }

  async function upload(URL:string){
    try{
      const formData = new FormData()
      formData.append("files",files)
      const result = (await axios.put(URL,formData,{
      headers:{
        "content-type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      responseType:"document",
      }))
      return result
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>files = </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={handleSubmit}>

        <input type='file' onChange={handleOnChange}/>
        <button type='submit'>submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
