// src/Chat.js
import React, { useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const peerRef = useRef();
  const mediaStreamRef = useRef();

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.signalData) {
        peerRef.current.signal(data.signalData);
      } else {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    });


    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        mediaStreamRef.current = stream;

        const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });

        newPeer.on('signal', (data) => {
          socket.send(JSON.stringify({ signalData: data }));
        });

        newPeer.on('data', (data) => {
          const receivedMessage = new TextDecoder('utf-8').decode(data);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        setPeer(newPeer);
      })
      .catch((err) => {
        console.error('Error accessing audio:', err);
      });

    socket.addEventListener('close', () => {
      console.log('WebSocket closed');
      if (peer) {
        peer.destroy();
        setPeer(null);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (peer) {
      peer.send(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage('');
    }else{
        alert("No peer connection")
    }
  };

  const handleCall = () => {
    if (mediaStreamRef.current) {
      peerRef.current = new SimplePeer({ initiator: false, trickle: false, stream: mediaStreamRef.current });

      peerRef.current.on('signal', (data) => {
        socket.send(JSON.stringify({ signalData: data }));
      });

      peerRef.current.on('data', (data) => {
        const receivedMessage = new TextDecoder('utf-8').decode(data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)
        }
        className='input'
      />
      <button onClick={handleSendMessage} className='p-3'>Send</button>
      <button onClick={handleCall}>Call</button>
    </div>
  );
};

export default Chat;
