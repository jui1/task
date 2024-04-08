import React, { useEffect, useState } from 'react';
import './style.css'; // Import your CSS file
import AgoraRTM from 'agora-rtm-sdk'

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const APP_ID = "cf2a8c06d628473da23185d8f1c7fa96";
  const uid = String(Math.floor(Math.random() * 10000));
  const servers = {
    iceServers: [
      { urls: ["stun:stun.l.google.com:19302", "stun:stun2.l.google.com:19302"] }
    ]
  };
  const quality = {
    video: { width: { min: 640, ideal: 1920, max: 1920 }, height: { min: 480, ideal: 1080, max: 1080 } },
    audio: true
  };

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(quality);
      setLocalStream(stream);

      const client = await AgoraRTM.createInstance(APP_ID);
      await client.login({ uid });

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const roomId = urlParams.get('room');

      if (!roomId) {
        window.location = 'lobby.html';
        return;
      }

      const channel = client.createChannel(roomId);
      await channel.join();

      channel.on("MemberJoined", handleUserJoined);
      channel.on("MemberLeft", handleUserLeft);
      client.on("MessageFromPeer", handleMessageFromPeer);

      const pc = new RTCPeerConnection(servers);

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      setPeerConnection(pc);
    };

    init();

    return () => {
      leaveChannel();
    };
  }, []);

  const handleUserJoined = async (MemberId) => {
    console.log("New user joined with ID:", MemberId);
    createOffer(MemberId);
  };

  const handleUserLeft = async (MemberId) => {
    console.log("User left with ID:", MemberId);
    setRemoteStream(null);
  };

  const handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);
    console.log("Received message:", message);

    if (message.type === 'offer') {
      await createAnswer(MemberId, message.offer);
    }
    if (message.type === 'answer') {
      await peerConnection.setRemoteDescription(message.answer);
    }
    if (message.type === 'candidate') {
      await peerConnection.addIceCandidate(message.candidate);
    }
  };

  const createOffer = async (MemberId) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendMessageToPeer({ type: "offer", offer }, MemberId);
  };

  const createAnswer = async (MemberId, offer) => {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendMessageToPeer({ type: "answer", answer }, MemberId);
  };

  const sendMessageToPeer = (message, MemberId) => {
    const client = AgoraRTM.createInstance(APP_ID);
    client.sendMessageToPeer({ text: JSON.stringify(message) }, MemberId);
  };

  const leaveChannel = async () => {
    if (peerConnection) {
      peerConnection.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    const client = AgoraRTM.createInstance(APP_ID);
    await client.logout();
  };

  const toggleCamera = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleMic = () => {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  return (
    <div>
      <div id="video">
        <video className="video-player" id="user-1" autoPlay playsInline ref={(video) => { if (video) video.srcObject = localStream; }}></video>
        <video className="video-player" id="user-2" autoPlay playsInline ref={(video) => { if (video) video.srcObject = remoteStream; }}></video>
      </div>

      <div id="controls">
        <div className="control-container" id="camera-btn" onClick={toggleCamera}>
          <img src="./icons8-video-call-48.png" alt="" />
        </div>
        <div className="control-container" id="mic-btn" onClick={toggleMic}>
          <img src="./icons8-mic-67.png" alt="" />
        </div>
        <a href="lobby.html">
          <div className="control-container" id="end-btn">
            <img src="./end-call-icon.png" alt="" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default VideoChat;
