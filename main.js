objects = [];
status1 = ""
function preload(){
video = createVideo("video.mp4");
}
function setup(){
canvas = createCanvas(500,400);
canvas.position(530,300)
video.hide();
}
function draw(){
    image(video,0,0,500,400)
    if(status1  != "" )
    {
        objectDetector.detect(video,gotResult);
        if(objects.length > 0){  
           document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detcted Are : " + objects.length;
           document.getElementById("status").innerHTML = "Status: Objects Detected" 
            for(i=0; i < objects.length; i++){
                console.log("Value Of I is-" + i )
                object_name = objects[i].label;
                object_confidence = (Math.floor(objects[i].confidence*100 ) + "%");
                object_x = objects[i].x;
                object_y = objects[i].y;
                object_width = objects[i].width;
                object_height = objects[i].height;
                text(object_name + " " +object_confidence,object_x,object_y-10);
                rect(object_x,object_y,object_width,object_height);
                fill("red")
                noFill()
                stroke("red")
                }
        }
        }
        
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
function modelLoaded(){
    console.log("Model Is Loaded")
    status1 = true
    video.loop()
    video.volume(1)
    video.speed(1)
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
objects = results;
}
