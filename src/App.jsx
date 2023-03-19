import React, { useRef } from 'react'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
import { drawHand } from './utilities'
function App() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const runHanspose = async()=>{
    const met = await handpose.load()
    console.log("Handpose loaded")
    // load and detect hand pose

    // // loop through the detect
    setInterval(()=>{
      detect(met)
    },100)
  }
  const detect = async(met)=>{
    // check data is available
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
      // Grab the video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set the camera height and width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
       // Set the canvas height and width
       canvasRef.current.width = videoHeight;
       canvasRef.current.height = videoHeight;

       // make detection

       const hand = await met.estimateHands(video);
      //  console.log(hand)

       const ctx = canvasRef.current.getContext("2d")
       drawHand(hand,ctx)
    }
  }
  runHanspose()
  return (
    <>
      <div className="App">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight:"auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            height: 500,
            width: 500,
          }} />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight:"auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            height: 500,
            width: 500,
          }} />
      </div>
    </>

  )
}

export default App
