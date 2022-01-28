import './App.css';
import {useState} from 'react'
import Meter from './Components/meter'



function App({socket}) {

  const [socketId,setId]= useState('')
  const [message,setMessage]= useState(0)
  const [inputId,setInputId]= useState('')
  const [errorFlag,setErrorFlag]= useState(false)
  const [dpermission,setdPermission]= useState(false)

  socket.on("connect",()=>{
      console.log(`You connected with id : ${socket.id}`);
      setId(socket.id)
  })

  socket.on("receive-message", message=>{
      //displayMessage(message)
      //console.log(message)
      setMessage(message)

  })

  socket.on("receive-message-broadcast", message=>{
      //console.log(message)
      setMessage(message)
  })

  

  const sendMessagee = ()=>{
    setId(socketId+" [Host]")
    setInterval(()=>{
      let message = Math.random()
      //console.log(message)
      setMessage(message)
      socket.emit("send-message",message,inputId)
    },600)
    
  }

  socket.on("give-display",requestingUser=>{
    //console.log("give-display call by "+requestingUser)
      setdPermission(true)
      setInputId(requestingUser)
  })

  const requestDisplay = ()=>{
    const cb=(flag)=>{
      setdPermission(flag)
      sendMessagee()
    }
    
    if(socketId.length > 0 && inputId.length>0){
      socket.emit("request-display",socketId,inputId,cb)
    }
  }

  const onSubmit =async(e)=>{
    e.preventDefault()
    if(inputId.length <=0 ) {
      setErrorFlag(true)
      return
    }

    requestDisplay()

  }


  return (
    <div className='app-body'>
      <header className='header'>
        <h2> ID : {socketId}</h2>
        {!dpermission ? <form onSubmit={onSubmit}>
          <input 
            type="text"  
            name="connect_to" 
            value={inputId}
            placeholder={errorFlag ? 'ID Required':'Add ID'}
            onChange={(e)=>setInputId(e.target.value)}
            /> 
          <button 
            type="submit"
            className={!dpermission?'btn':'btn-red'}
            >
              {!dpermission?'Connect':'Stop'}
            </button>
        </form>
        : <h3 style={{color:'green'}}>Connected to : {inputId}</h3>}
      </header>
      <div className='message-container'>
          <Meter data={message}/>
      </div>
    </div>
  );
}



export default App;
