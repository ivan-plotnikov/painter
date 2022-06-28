const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const colorPicker = document.getElementById("color-picker");
const sizePicker = document.getElementById("size-picker");

const brashSwitch = document.getElementById("brash");
const eraserSwitch = document.getElementById("eraser");

const brushSize = document.getElementById("brush-size");

const imageInsert = document.getElementById("image-insert");
const imageDownloader = document.getElementById("image-downloader");

const canvasCleaner = document.getElementById("canvas-clear");

const imageUploader = document.getElementById("image-upload");

const imagesContainer = document.getElementById("images-container");

let color = "black";
let mode = "brush";

colorPicker.addEventListener("input", changeColor);
sizePicker.addEventListener("input", changeSize);

brashSwitch.addEventListener("click", setBrashMode);
eraserSwitch.addEventListener("click", setEraserMode);

imageInsert.addEventListener("change", insertImage);
imageDownloader.addEventListener("click", downloadImage);

imageUploader.addEventListener("click", uploadImageToServer);
canvasCleaner.addEventListener("click", clearCanvas);

const bg = document.getElementsByClassName("bg-image");

Array.from(bg).forEach(function (e) {
  e.addEventListener("click", changeBackground);
});

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeBackground(e) {
  const bg = "assets/bg/" + e.target.value + "-big.png";
  const image = new Image();
  image.src = bg;
  image.onload = function () {
    context.drawImage(image, 0, 0);
  };
}

function uploadImageToServer() {
  const image = canvas.toDataURL();

  const fd = new FormData();
  fd.append("image", image);

  fetch("/upload.php", {
    method: "POST",
    body: fd,
  }).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
      }))
      .then((res) => {
        const innerImage = document.createElement("img");
        innerImage.src = res.data.image;
        innerImage.classList.add("border", "rounded");
        imagesContainer.prepend(innerImage);
        if (document.getElementById("no-images")) {
          document.getElementById("no-images").style.visibility = "hidden";
        }
      })
  );
}

function downloadImage() {
  imageDownloader.href = canvas.toDataURL();
}

function insertImage(ev) {
  let file = ev.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function (e) {
    const image = new Image();
    image.src = e.target.result;
    image.onload = function () {
      context.drawImage(image, 0, 0);
    };
  };
}

function setBrashMode() {
  context.globalCompositeOperation = "source-over";
  mode = "brush";
  eraserSwitch.classList.remove("btn-tool-active");
  brashSwitch.classList.add("btn-tool-active");
}

function setEraserMode() {
  context.globalCompositeOperation = "destination-out";
  mode = "eraser";
  brashSwitch.classList.remove("btn-tool-active");
  eraserSwitch.classList.add("btn-tool-active");
}

function changeColor(e) {
  const selectedColor = e.target.value;
  context.strokeStyle = selectedColor;
  color = selectedColor;
  brushSize.style.backgroundColor = selectedColor;
}

function changeSize(e) {
  const size = parseInt(e.target.value);
  context.lineWidth = size;
  brushSize.style.height = 3 + size + "px";
  brushSize.style.width = 3 + size + "px";
}

context.lineCap = "round";
context.lineWidth = sizePicker.value;
context.strokeStyle = colorPicker.value;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let draw = false;

canvas.addEventListener("mousedown", () => (draw = true));
canvas.addEventListener("mouseup", () => (draw = false));

canvas.addEventListener("mouseenter", function () {
  if (mode === "brush") {
    const svgBrush =
      "<svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M2.07468 11.5641C2.14085 11.8058 2.28685 12.1308 2.3989 12.2864C2.51095 12.4421 3.59096 13.5492 4.7988 14.7468C7.1304 17.0584 7.26967 17.1563 7.87205 16.9043C8.27437 16.7359 8.48578 16.4093 8.48578 15.9559C8.48578 15.6112 8.4072 15.5005 7.49117 14.557C6.43617 13.4702 6.29017 13.199 6.46868 12.6575C6.6217 12.1932 6.97998 11.9435 7.493 11.9435C7.86012 11.9435 7.97766 11.9998 8.36969 12.3633C8.6187 12.5942 8.92234 12.8355 9.04449 12.8994C9.52597 13.1513 10.2207 12.7045 10.214 12.1471C10.2124 12.0087 10.1044 11.722 9.97407 11.5101C9.6234 10.9401 9.65235 10.4673 10.0631 10.056C10.4739 9.64473 10.9462 9.61574 11.5155 9.96684C11.9857 10.2568 12.3251 10.2716 12.6492 10.0163C12.9681 9.7652 13.0611 9.34206 12.8751 8.98932C12.7961 8.83977 12.3574 8.34913 11.9002 7.89894C10.7625 6.7788 10.6509 6.54508 10.9514 5.91106C11.2024 5.38151 11.8576 5.14732 12.3634 5.40655C12.4789 5.46578 13.2474 6.18079 14.0711 6.99547C15.4952 8.40412 15.5873 8.47673 15.9492 8.47673C16.4083 8.47673 16.7342 8.2667 16.903 7.86225C17.158 7.25114 17.0711 7.1299 14.6054 4.65369C13.0055 3.04686 12.1654 2.27253 11.9002 2.16005C11.394 1.9455 10.5506 1.94685 10.1208 2.16294C9.68543 2.38192 2.46844 9.57395 2.23905 10.0175C1.9936 10.4921 1.93416 11.0516 2.07468 11.5641Z' fill='{{FillColor}}'/><path d='M12.4854 22.2383C12.0336 22.0336 9.52815 19.6556 9.18208 19.1032C9.08214 18.9436 9.00019 18.6396 9 18.4276C8.99961 18.0477 9.06705 17.9746 13.5237 13.521C17.8989 9.14889 18.06 9 18.4144 9C18.6159 9 18.8983 9.06178 19.0421 9.13719C19.5144 9.38528 22.0355 12.0172 22.2469 12.4829C22.7119 13.5073 22.4104 14.4344 21.2418 15.5743C20.833 15.9731 20.4363 16.4169 20.3604 16.5605C20.2022 16.8599 20.1787 17.5739 20.3154 17.9332C20.5251 18.4843 21.3596 19.116 24.0417 20.7536C25.6819 21.755 26.766 22.8014 27.3665 23.9624C28.167 25.5101 28.2102 26.7568 27.4884 27.4786C26.1708 28.7963 23.075 27.5005 21.31 24.8926C21.0898 24.5673 20.5985 23.7842 20.2181 23.1524C18.8329 20.8514 18.1968 20.215 17.2824 20.215C16.6732 20.215 16.4337 20.3582 15.5785 21.2337C14.438 22.4013 13.5099 22.7028 12.4854 22.2383Z' fill='black'/></svg>";
    let svgCursor = svgBrush.replace("{{FillColor}}", color);
    svgCursor = encodeURIComponent(svgCursor.replace(/"/g, "'"));
    canvas.style.cursor = `url("data:image/svg+xml,${svgCursor}") 5 5, auto`;
  } else {
    const svgEraser =
      "<svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M2.86611 9.13386C1.69453 10.3054 1.69453 12.2049 2.86611 13.3765L16.3683 26.8787C17.5398 28.0502 19.4393 28.0502 20.6109 26.8787L27.032 20.4575C28.2036 19.286 28.2036 17.3865 27.0321 16.2149L13.5299 2.71273C12.3583 1.54115 10.4588 1.54115 9.28725 2.71272L2.86611 9.13386ZM3.82465 9.7785C3.0436 10.5595 3.0436 11.8259 3.82465 12.6069L10.963 19.7453L19.9756 10.7327L12.8372 3.59433C12.0562 2.81328 10.7899 2.81328 10.0088 3.59433L3.82465 9.7785Z' fill='black'/><path d='M3.82465 12.6069C3.0436 11.8259 3.0436 10.5595 3.82465 9.7785L10.0088 3.59433C10.7899 2.81328 12.0562 2.81328 12.8372 3.59433L19.9756 10.7327L10.963 19.7453L3.82465 12.6069Z' fill='white'/></svg>";
    canvas.style.cursor = `url("data:image/svg+xml,${svgEraser}") 5 5, auto`;
  }
});

canvas.addEventListener("mousemove", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const prevX = e.movementX;
  const prevY = e.movementY;

  if (draw === true) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - prevX, y - prevY);
    context.stroke();
    context.closePath();
  }
});
