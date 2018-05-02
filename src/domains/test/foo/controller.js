/**
*   Foo controller
*/

const handle = res => promise => promise.then((result) => {
  res.send(result);
}).catch((err) => {
  res.status(500);
  res.send('An error has occured', err);
});

class Controller {
  constructor(service) {
    this.service = service;
  }

  find(req, res) {
    handle(res)(this.service.find(req.query));
  }

  findOne(req, res) {
    handle(res)(this.service.findOne(req.params.id));
  }

  create(req, res) {
    handle(res)(this.service.create(req.body));
  }

  update(req, res) {
    handle(res)(this.service.update(req.query, req.body));
  }

  delete(req, res) {
    handle(res)(this.service.delete(req.query));
  }

  deleteOne(req, res) {
    handle(res)(this.service.deleteOne(req.params.id));
  }
}

module.exports = Controller;