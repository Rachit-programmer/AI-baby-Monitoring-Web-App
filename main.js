song="";
status="";
objects=[];

function preload()
{
    song=loadSound("alert.mp3");
}
function play()
{
  song.play();
}
function stop()
{
    song.stop();
}

function setup()
{
  canvas = createCanvas(380,380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector=ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function draw()
{
    image(video,0,0,380,380);

    if(status != "")
    {
      r = random(255);
      g = random(255);
      b = random(255);

      objectDetector.detect(video,gotResult);

      for(i = 0 ; i < objects.length ; i++)
    
    {
    document.getElementById("status").innerHTML = "Status: Object Detected";
    percent = floor(objects[i].confidence * 100);
    fill(r,g,b);
    text(objects[i].label + "" + percent + "%" , objects[i].x, objects[i].y);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(object.length != 0){
    
       if(objects[i].label == "person")
    {
      document.getElementById("baby_info").innerHTML = "Baby Detected";
      song.stop();
    }
     else
    {
    document.getElementById("baby_info").innerHTML ="Baby Not Detected";
    song.play();
    }}
    else{    document.getElementById("baby_info").innerHTML ="Baby Not Detected";
    song.play();}
  }
  }
}

  
  
function modelLoaded()
{
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(video,gotResult);
}
function gotResult(error,results)
{
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    objects = results;
  }
}