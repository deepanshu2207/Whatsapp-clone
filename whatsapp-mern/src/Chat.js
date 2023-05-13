import React, { useState } from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import axios from './axios';
function Chat({messages}) {
    const [input,setInput] = useState("");

    const sendMessage = async (e) => {
            e.preventDefault();

            axios.post("/messages/new",{
                message: input,
                name: "DEMO APP",
                timestamp: "Just now!",
                received: false
            });   
            setInput(""); 
    };  
    
    
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar />
                <div className='chat__headerInfo'>
                    <h3>Room Name</h3>
                    <p>
                        Last seen at ...
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='chat__body'>
                    {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestemp">{message.timestamp}</span>
                    </p>
                    ))}  
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
    )
}

export default Chat
