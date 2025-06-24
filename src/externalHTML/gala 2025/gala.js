const slides = [
  "gala1.jpg",
  "kitchen1.jpg",
  "townfridge.jpg",
  "gala6.jpg",
  "kitchen2.jpg",
  "gala5.jpg",
  "dudes.jpg",
];

let counter = 0;
const carousel = document.querySelector(".carousel-content");
const changeSlide = () => {
  const img = document.createElement("img");
  img.src = "images/" + slides[counter];
  img.classList.add("carousel-img");
  if (counter + 1 < slides.length) {
    counter++;
  } else {
    counter = 0;
  }
  carousel.appendChild(img);
  setTimeout(() => {
    carousel.removeChild(img);
  }, 5000);
};
setInterval(changeSlide, 4000);
changeSlide();
