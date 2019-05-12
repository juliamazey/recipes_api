pry = require('pryjs')

class SendResponse {

  status200Key(res, apiKey) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ apiKey: apiKey }))
  }

  status401Invalid(res, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: message}))
  }

}


module.exports = SendResponse;
