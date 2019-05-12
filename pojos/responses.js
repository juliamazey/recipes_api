pry = require('pryjs')

class SendResponse {

  status200Key(res, apiKey) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ apiKey: apiKey }))
  }

  status200Object(res, object) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(object);
  }

  status401Invalid(res, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: message}))
  }

  status400Error(res, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({error: message});
  }

}


module.exports = SendResponse;
