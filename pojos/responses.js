pry = require('pryjs')

class SendResponse {

  status200Key(res, apiKey) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ apiKey: apiKey }))
  }

  statusObject(res, status, object) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(object);
  }

  status204(res){
    res.status(204).send({});
  }

  statusMessage(res, status, message) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({message: message}))
  }

}


module.exports = SendResponse;
