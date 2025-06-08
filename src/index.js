function displayContent(response) {
  let raw = response.data.answer;

  let html = raw
    // Bold and italics
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Proper [text](link) markdown
    .replace(
      /\[(.*?)\]\((https?:\/\/.*?)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    )

    // Plain raw links, only if not already part of an anchor
    .replace(
      /(?<!href=")(https?:\/\/[^\s<"]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    )

    // Newlines to <br>
    .replace(/\n/g, "<br>");

  new Typewriter("#content", {
    strings: html,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function classicalComposer(event) {
  event.preventDefault();

  let key = `b4d4bae12atf537f223c2747of06ba2b`;
  let userPrompt = document.querySelector("#prompt");
  let context = `You are a classical music listening guide. You match users' current mood to a classical piece or composition to listen to, with a clickable YouTube link on a new line in the format: https://www.youtube.com/results?search_query=title+composer, which you'll wrap in short anchor text. You also sign 'SheCodes AI' as an italic footnote at the bottom.`;
  let prompt = `Tell me which classical piece or composition I should try listening to right now, with the YouTube link on a new line. Here is my current mood: ${userPrompt.value}`;
  let api = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${key}`;

  let contentElement = document.querySelector("#content");
  contentElement.innerHTML = `
    <div id="loading-text">Generating recommendation <i class="fa-regular fa-hourglass-half"></i></div>
    <img src="src/classicalmusic.png" alt="Image of classical music" />
  `;

  axios.get(api).then(function (response) {
    // Clear image and loading text, then show the typed content
    contentElement.innerHTML = "";
    displayContent(response);
  });
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", classicalComposer);
