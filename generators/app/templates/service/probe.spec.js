'use strict';

describe('Factory: probe', function () {

	beforeEach(module('components.probe.factory'));
	beforeEach(module('socketMock'));

	var Probe, $httpBackend, c, cl;
	beforeEach(inject(function (_Probe_, _$httpBackend_) {
		Probe = _Probe_;
		$httpBackend= _$httpBackend_;

		c = {_id: 1, name: 'name', status: 1, type: 'contact', selected: true};
		cl = {_id: 2, name: 'name1', status: 0, type: 'contactless', selected: false};
	}));

	it('getContactSelected Doit retourner une erreur si echec de requete ', function () {
		$httpBackend.when('GET','/api/probes/contact/selected')
		.respond(500);
		Probe.getContactSelected().catch(function(e){
			should.exist(e);
		});
		$httpBackend.flush();

		$httpBackend.when('GET','/api/probes/contactless/selected')
		.respond(404);
		Probe.getContactlessSelected().catch(function(e){
			should.exist(e);
		});
		$httpBackend.flush();
	});

	it('Doit retourner une probe contact bien construite', function () {
		$httpBackend.when('GET','/api/probes/contact/selected')
		.respond(204)
		.respond(c);
		Probe.getContactSelected().then(function(p){
			p.getName().should.equal(c.name);
			p.isContact().should.equal(true);
			p.isContactless().should.equal(false);
			p.isAvailable().should.equal(true);
			p.isPending().should.equal(false);
			p.isUnavailable().should.equal(false);
			p.isSelected().should.equal(true);
		});
		$httpBackend.flush();

		$httpBackend.when('GET','/api/probes/contactless/selected')
		.respond(204)
		.respond(cl);
		Probe.getContactlessSelected().then(function(p){
			p.isContact().should.equal(false);
			p.isContactless().should.equal(true);
			p.isAvailable().should.equal(false);
			p.isPending().should.equal(false);
			p.isUnavailable().should.equal(true);
			p.isSelected().should.equal(false);
		});
		$httpBackend.flush();
	});

	it('Doit retourner une liste de probes', function () {
		$httpBackend.when('GET','/api/probes')
		.respond(204)
		.respond([c, cl]);
		Probe.query().then(function(ps){
			(ps.length).should.equal(2);
			(ps[0] instanceof Probe).should.equal(true);
			(ps[1] instanceof Probe).should.equal(true);
		});
		$httpBackend.flush();
	});

	it('Doit retourner un etat par défaut', function () {
    var tmp = new Probe({_id: '1', name: 'name'});
    tmp.isSelected().should.equal(false);
    tmp.isContact().should.equal(false);
    tmp.isAvailable().should.equal(false);
    tmp.isPending().should.equal(false);
    tmp.isUnavailable().should.equal(true);
  });

  it('Doit maj une probe', function () {
  	$httpBackend.when('GET','/api/probes/1')
		.respond(200, {selected: true, status: 1, type: 'contact'});

    var tmp = new Probe({_id: '1', name: 'name'});
    tmp.getInfo();
    $httpBackend.flush();

    tmp.isSelected().should.equal(true);
    tmp.isContact().should.equal(true);
    tmp.isAvailable().should.equal(true);
    tmp.isPending().should.equal(false);
    tmp.isUnavailable().should.equal(false);
  });

	it('Doit selectionner une probe', function () {
		var tmp = new Probe(cl);
		(tmp.isSelected()).should.equal(false);
		$httpBackend.when('PUT','/api/probes/select/2')
    .respond(200, {selected: true});
    tmp.select();
		$httpBackend.flush();
		(tmp.isSelected()).should.equal(true);
	});

	it('Doit deselectionner une probe', function () {
		var tmp = new Probe(c);
		(tmp.isSelected()).should.equal(true);
		$httpBackend.when('PUT','/api/probes/unselect/1')
    .respond(200, {selected: false});
    tmp.unselect();
		$httpBackend.flush();
		(tmp.isSelected()).should.equal(false);
	});

	it('Doit update une probe', function () {
		var tmp = new Probe(c);
		tmp.setName('toto');
		(tmp.getName()).should.equal('toto');
		$httpBackend.when('PUT','/api/probes/1')
    .respond(200, {name: 'toto'});
		tmp.update().then(function(p){
			p.name.should.equal('toto');
		});
		$httpBackend.flush();
	});
});
