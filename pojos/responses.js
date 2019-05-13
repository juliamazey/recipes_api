pry = require('pryjs')

class SendResponse {
  statusKey(res, status, apiKey) {
    res.setHeader("Content-Type", "application/json");
    res.status(status).send(JSON.stringify({ apiKey: apiKey }));
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
    res.status(status).send(JSON.stringify({message: message}));
  }
}

module.exports = SendResponse;
