const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (_req, res) => {
  const randomQuote = getRandomElement(quotes);

  res.send({
    quote:  randomQuote 
  });
});

app.get("/api/quotes", (req, res) => {
  const person = req.query.person;
  const findName = quotes.find((quote) => quote["person"] === person);
  if (person && findName) {
    res.send({
      quotes: [findName],
    });
  } else if (person && !findName) {
    res.send({
      quotes: [],
    });
  } else {
    res.send({
      quotes: quotes,
    });
  }
});

app.post("/api/quotes", (req, res) => {
  const person = req.query.person;
  const quote = req.query.quote;
  if (!person || !quote)
  {
    res.status(400).send()
  } else {
    const newQuote = {
      quote: quote,
      person: person
    }
    quotes.push(newQuote);
    res.send({
      quote: newQuote,
    });
    }
  
  
});



app.listen(PORT);
