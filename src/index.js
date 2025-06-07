function classicalComposer(event) {
  event.preventDefault();

  new Typewriter("#content", {
    strings: "The generated content will go here",
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

let contentElement = document.querySelector("#form");
contentElement.addEventListener("submit", classicalComposer);
