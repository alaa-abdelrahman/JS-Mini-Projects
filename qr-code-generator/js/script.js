let generateBtn = document.getElementById("generateBtn");
let qrInput = document.getElementById("qrInput");
let qrCodeImg = document.getElementById("qrCodeImg");
let errorMessage = document.getElementById("errorMessage");
let clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue) {
    errorMessage.classList.add("show");
    return;
  }
  errorMessage.classList.remove("show");
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}`;
  generateBtn.innerText = "Generating...";
  qrCodeImg.classList.add("show", "p-3", "border", "rounded", "mb-5");
  qrCodeImg.onload = () => {
    generateBtn.innerText = "Generate QR Code";
  };
});

clearBtn.addEventListener("click", () => {
  qrInput.value = "";
  qrCodeImg.classList.remove("show");
  errorMessage.classList.remove("show");
});
