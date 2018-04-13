function textChangeListener (evt) {
  var id = evt.target.id;
  var text = evt.target.value;
  
  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }
  
  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}
    
function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");
  // Drawing the image
  if (image != null) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    document.querySelector('#saveBtn').addEventListener('click', saveFile, false);
  }

  // Setting text attributes
  ctx.font = '2.5em Impact';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'center';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'white';

  // If I have a top line, draw the text
  if (topLine != null) {
    ctx.fillText(topLine.toUpperCase(), canvas.width / 2, 50);
    ctx.strokeText(topLine.toUpperCase(), canvas.width / 2, 50);
  }

  // If I have a top line, draw the text
  if (bottomLine != null) {
    ctx.fillText(bottomLine.toUpperCase(), canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomLine.toUpperCase(), canvas.width / 2, canvas.height - 20);
  }
  
}

function saveFile() {
  var canvas = document.querySelector('canvas');
  var dt = canvas.toDataURL('image/jpeg');
  this.href = dt;
}

function handleFileSelect(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function(fileObject) {
    var data = fileObject.target.result;
    
    // Create an image object
    var image = new Image();
    image.onload = function() {
      
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    }
    
    // Set image data to background image.
    image.src = data;
    console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
