import React, {useState} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [files,setFiles] = useState<any>()
  const [fileName,setFileName] = useState<string>('')
  function handleOnChange(e:any){
    let reader = new FileReader()
    reader.onload = (e) => {
      setFiles(e.target?.result)
    }
    reader.readAsDataURL(e.target.files[0])
    setFileName(e.target.files[0].name.trim().replace(/(.xlsx)$/,''))
    console.log('fileName: ',fileName);
  }
  async function handleSubmit(e:any){
    e.preventDefault()
    let getUploadURL = await getURL()
    console.log('get upload url: ',getUploadURL)

    // console.log('files: ',files);
    let binary = atob(files.split(',')[1])
    // console.log('binary: ',binary); 
    let array = []
    for (let i = 0;i<binary.length;i++){
      array.push(binary.charCodeAt(i))
    }
    let blobData:Blob = new Blob([new Uint8Array(array)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    // let blobData:Blob = new Blob([new Uint8Array(array)],{type:'image/jpeg'})
    // console.log('blobData: ',blobData)

    let uploadFile = await upload(getUploadURL,blobData)
    // console.log('upload File: ',uploadFile)
  }
  async function getURL(){
    try{
      const response = (await axios.get(`https://xrglztnix0.execute-api.eu-central-1.amazonaws.com/uploads?fileName=${fileName}`)).data.uploadURL
      // const regExp = /(\b\/).*?(\b\.xlsx)/
      // const matcher = response.match(regExp)[0]
      // console.log('matcher: ',matcher);
      // const uploadURL = response.replace(regExp,fileName)
      // console.log('uploadURL: ',uploadURL)
      // console.log('response: ',response);
    return response 
    // return uploadURL
    }catch (error){
      console.error(error)
    }
  }

  async function upload(URL:string,blobData:Blob){
    try{
      const formData = new FormData()
      formData.append("files",blobData)
      const result = await fetch(URL,{
        method: 'PUT',
        body:blobData
      })
      // const result = (await axios.put(URL,formData,{
        
      // }))
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
