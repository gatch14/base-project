const superagent = require('superagent');
const expect = require('chai').expect;

describe('Node Server Running', () => {
  it('should status return 200', (done) => {
    superagent.get('http://127.0.0.1:3000')
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        done();
      })
  });

  it('should status return 404', (done) => {
    superagent.get('http://127.0.0.1:3000/mockroute')
      .end(function(err, res){
        expect(res.statusCode).to.equal(404);
        done();
      })
  });

  it('should find travel by id', (done) => {
    superagent.post('http://localhost:3000/api/transports/transport/findOne')
      .send({
        id: 2
      })
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.body.result.id).to.equal(2);
        expect(res.status).to.equal(200);
        done();
      })
  });

  it('should find all travel', (done) => {
    superagent.get('http://localhost:3000/api/transports/transport/findAll')
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.body.result.length).to.be.above(0);
        expect(res.status).to.equal(200);
        done();
      })
  });

  it('should delete a travel', (done) => {
    superagent.delete('http://localhost:3000/api/transports/transport/destroy')
      .send({
        id: 5
      })
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.body.result).to.be.equal(1);
        expect(res.status).to.equal(200);
        done();
      })
  });

  it('should create a travel', (done) => {
    superagent.post('http://localhost:3000/api/transports/transport/save')
      .send({
        title: 'trip test',
        fromLat: 50,
        fromLon: 32.21,
        toLat: 50.32,
        toLon: 100,
        vehicule: 'DRIVING',
        comment: 'my super comment'
      })
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.body.newTravel.createdAt.length).to.not.equal(null);
        expect(res.status).to.equal(200);
        done();
      })
  });

  it('should update a travel', (done) => {
    superagent.put('http://localhost:3000/api/transports/transport/update')
      .send({
        id: 2,
        comment: 'my super comment'
      })
      .end(function(err, res){
        expect(err).to.equal(null);
        expect(res.body.result).to.equal('ok');
        expect(res.status).to.equal(200);
        done();
      })
  });
});

