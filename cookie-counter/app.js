const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = process.env.PORT || 5000

app.use(express.static('public'))
app.use(cookieParser())

app.get('/', (request, response) => {
  console.log(`request cookie (header): ${request.cookie}`)
  console.log(`request.cookies (parsed): ${JSON.stringify(request.cookies)}`)

  let hits = +(request.cookies.hits || 0);
  if (isNaN(hits) || hits < 0) {
    hits = 0;
  }
  hits += 1;

  response.cookie('hits', ''+hits);
  let output = `Visits by you: ${hits}`
  response.type('text/plain')
  response.send(output)
});

app.listen(port, () => console.log(`Cookie Counter listening on port ${port}!`))
