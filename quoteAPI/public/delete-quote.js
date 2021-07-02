const deleteButton = document.getElementById("delete-quote");
const deletedQuoteContainer = document.getElementById("deleted-quote");

deleteButton.addEventListener("click", () => {
  const id = document.getElementById("id").value;

  fetch(`/api/quotes?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((quote) => {
      const deletedQuote = document.createElement("div");
      deletedQuote.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    <div class="quote-text">${quote[0]['id']}) ${quote[0]["quote"]}</div>
    <div class="attribution">- ${quote[0]["person"]}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
      deletedQuoteContainer.appendChild(deletedQuote);
    });
});
