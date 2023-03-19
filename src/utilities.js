// finger points

const fingerPoint = {
    thumb : [0,1,2,3,4],
    indexFinger:[0,5,6,7,8],
    middeleFinger:[0,9,10,11,12],
    ringFinger:[0,13,14,15,16],
    pinkyFinger:[0,17,18,19,20]
} 

// Infinity Gauntlet Style
const style = {
    0: { color: "yellow", size: 15 },
    1: { color: "gold", size: 6 },
    2: { color: "green", size: 10 },
    3: { color: "gold", size: 6 },
    4: { color: "gold", size: 6 },
    5: { color: "purple", size: 10 },
    6: { color: "gold", size: 6 },
    7: { color: "gold", size: 6 },
    8: { color: "gold", size: 6 },
    9: { color: "blue", size: 10 },
    10: { color: "gold", size: 6 },
    11: { color: "gold", size: 6 },
    12: { color: "gold", size: 6 },
    13: { color: "red", size: 10 },
    14: { color: "gold", size: 6 },
    15: { color: "gold", size: 6 },
    16: { color: "gold", size: 6 },
    17: { color: "orange", size: 10 },
    18: { color: "gold", size: 6 },
    19: { color: "gold", size: 6 },
    20: { color: "gold", size: 6 },
  };

// Drawing hands

export const drawHand = (predictions,ctx)=>{
    // Check if a prediction is available
    if(predictions.length>0){
        // loop through each prediction
        predictions.forEach((prediction) => {
            // grab the landmarks
            const landmarks = prediction.landmarks;

            // loop through fingers
            for(let j=0;j< Object.keys(fingerPoint).length;j++){
                let finger = Object.keys(fingerPoint)[j];
                // loop through pair of index
                for(let k=0; k < fingerPoint[finger].length - 1;k++){
                    //Get pair of joints
                    const firstIndexFinger = fingerPoint[finger][k];  
                    const secondIndexFinger = fingerPoint[finger][k + 1];
                    
                    
                    // draw the finger line

                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstIndexFinger][0],
                        landmarks[firstIndexFinger][1],
                    );
                    ctx.lineTo(
                        landmarks[secondIndexFinger][0],
                        landmarks[secondIndexFinger][1],
                    );

                    ctx.strokeStyle = "gold"
                    ctx.lineWidth = 4
                    ctx.stroke()
                }
            }
            // loop through each landmarks
            for(let i=0; i<landmarks.length;i++){
                // Get x point
                const x = landmarks[i][0];
                // Get y point
                const y = landmarks[i][1];
                // start drawing
                ctx.beginPath()
                ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
                ctx.fillStyle=style[i]["color"]
                ctx.fill()
            }
        });
    }
}