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

  statusMessage(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({message: message}))
  }

}


module.exports = SendResponse;
