const bubbles = document.querySelectorAll(".bubble");
const bubblePosition = [0, 50];
const search = document.querySelector(".search-wrapper");
const S = document.querySelector(".S");
const input = document.createElement("input");
input.type = "text";
input.className = "inputSearch";
input.placeholder = "_ type something";
let counter = 0;
let distanceAll = [];

function bubbling() {
  if (counter < bubbles.length) {
    setTimeout(function () {
      bubbles[counter].classList.add("animate");
      let distance = [counter] * 50 + "px";
      distanceAll[counter] = distance;
      counter++;
      bubbling(counter);
    }, 1200);
  }
}

bubbling();

search.addEventListener("mouseover", function () {
  console.log("ciao");
  bubbles[0].style = "width: 350px; border-radius: 10px;  z-index: 1;";
  bubbles[0].classList.remove("animate");
  input.placeholder = ">";
  S.style.color = "#333333";
  setTimeout(() => {
    S.innerHTML = "";
    bubbles[0].appendChild(input);
    let inputAppended = document.querySelector(".inputSearch");
    inputAppended.focus();
    inputAppended.style = "caret-color: transparent";
    inputAppended.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        console.log(
          "Now I am removing text but you can do whatever you want with text value 😊"
        );
        inputAppended.value = "";
      }
    });
  }, 1000);
});

search.addEventListener("mouseout", function () {
  console.log("ciao");
  let inputAppended = document.querySelector(".inputSearch");
  bubbles[0].style = "";
  bubbles[0].classList.add("animate");
  S.style.color = "#4C83F0";
  // inputAppended.value = '';
  inputAppended.style = "caret-color: transparent; z-index: -1;";
  input.placeholder = "";

  setTimeout(() => {
    bubbles[0].removeChild(input);
    S.innerHTML = "S";
  }, 1000);
});
