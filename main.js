video="";
status=""
objects=[];

function setup(){
    canvas=createCanvas(400,350);
    canvas.center();
    video.hide();
}
function preload(){
video=createVideo("video.mp4");


}
function draw(){
    image(video,0,0,400,350);
    if(status!=""){
        objectdetector.detect(video,gotResult);
        
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="objects detected";
            document.getElementById("Number_of_objects").innerHTML="Number of objects detected (:="+objects.length;
            fill("#07fa48")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label + "" + percent + "%",objects[i].x +15,objects[i].y+15)
            noFill()
            stroke("#07fa48")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }
}
function start(){
objectdetector=ml5.objectDetector('cocossd',modelLoaded);  
document.getElementById("status").innerHTML="status:object detecting";  
}
function modelLoaded(){
    console.log("model loaded");  
    status=true;
    video.loop();  
    video.speed(1);  
    video.volume(1);  
}
function gotResult(error,results){
   if(error){
    console.error(error);  
   } 
   else{
  console.log(results);  
  objects=results;  
}
}