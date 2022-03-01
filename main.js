video="";
status="";
object=[];
function preload(){
}
function setup(){
    canvas = createCanvas(480, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 450);
}
function gotResult(error, results){
    if(error){
        console.log(error);
        console.error();
    }
    console.log(results);
    object=results;
}
function draw(){
    image(video, 0, 0, 480, 450);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            document.getElementById("number").innerHTML = "Number of objects on screen is equal to "+object.length;

            fill("#BB0000");
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#BB0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == objectName){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=objectName+" has been found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(objectName + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = objectName + " has not been found";
            }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objectName = document.getElementById("objectname").value;
}
function modelLoaded(){
    console.log("model has loaded");
    status = true;
}