var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,// to make the png on the snapshot div bigger, use dest_width and dest_height. Sidenote for Papa.
    image_format: "png",
    png_quality: 100
});

var camera = document.getElementById("camera");
Webcam.attach(camera);

function Pic() {
    Webcam.snap(function (uri) {
        document.getElementById("result").innerHTML = "<img src=" + uri + " id='snapped_image'>";
    });
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/A3RWWfO9b/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}

function Speak() {
    Synth = window.speechSynthesis;
    speak_1 = "The first prediction is " + prediction1;
    speak_2 = "And the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_1 + speak_2);
    Synth.speak(utterThis);
}

function Predict() {
img= document.getElementById("snapped_image");
classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
       console.error(error);
    }else{
    console.log(result);
        document.getElementById("result_emotion_name").innerHTML= result[0].label;
        document.getElementById("result_emotion_name2").innerHTML= result[1].label;
        prediction1= result[0].label;
        prediction2= result[1].label;
        Speak()

        if (result[0].label=="Happy") {
            document.getElementById("update_emoji").innerHTML= "&#128512;";
        }
        if (result[0].label=="Sad") {
            document.getElementById("update_emoji").innerHTML= "&#128557;";
        }
        if (result[0].label=="Furious") {
            document.getElementById("update_emoji").innerHTML= "&#128545;";
        }
        if (result[0].label=="Scared") {
            document.getElementById("update_emoji").innerHTML= "&#128561;";
        }
        if (result[0].label=="Disgusted") {
            document.getElementById("update_emoji").innerHTML= "&#129314;";
        }
        if (result[1].label=="Happy") {
            document.getElementById("update_emoji2").innerHTML= "&#128512;";
        }
        if (result[1].label=="Sad") {
            document.getElementById("update_emoji2").innerHTML= "&#128557;";
        }
        if (result[1].label=="Furious") {
            document.getElementById("update_emoji2").innerHTML= "&#128545;";
        }
        if (result[1].label=="Scared") {
            document.getElementById("update_emoji2").innerHTML= "&#128561;";
        }
        if (result[1].label=="Disgusted") {
            document.getElementById("update_emoji2").innerHTML= "&#129314;";
        }
    }
}