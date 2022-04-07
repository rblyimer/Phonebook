const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//Phonebook backend step1
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//Phonebook backend step2
const moment = require("moment-timezone");
app.get("/api/info", (request, response) => {
  response.send(
    "Phonebook has info for " +
      persons.length +
      " people" +
      "<br/>" +
      "<br/>" +
      moment().tz("America/New_york").toString()
  );
});

//Phonebook backend step3
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//Phonebook backend step4
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((persons) => persons.id !== id);

  response.status(204).end();
});

//Phonebook backend step5
const generateId = () => {
  const maxID = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxID + 1;
};

//Phonebook backend step6
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  let person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
