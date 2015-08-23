'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var config = require('./yo-rc.json');
var util = require('./util');
var _ = require('lodash');

var files = [];

function addFile(origin, dest, arg1, arg2) {
  files.push({
    src: origin,
    dest: dest,
    before: arg1,
    after: arg2
  });
}

function addFileJSON(origin, dest, obj) {
  files.push({
    src: origin,
    dest: dest,
    after: obj
  });
}

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the legendary ' + chalk.red('Component For Angular') + ' generator!' +
      'Here you will create a project for create an angular component.'
    ));

    var prompts = [{
      type: 'input',
      name: 'authorName',
      message: 'Your name?',
      default: 'aee'
    }, {
      type: 'input',
      name: 'authorMail',
      message: 'Your mail?',
      default: 'a.etienne92@gmail.com'
    }, {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: 'my-module'
    }, {
      type: 'input',
      name: 'directiveName',
      message: 'Whould you like to create a directive?'
    }, {
      type: 'input',
      name: 'serviceName',
      message: 'Whould you like to create a service?'
    }];

    this.prompt(prompts, function(props) {
      props.name = props.name.replace(' ', '-');
      config.name = props.name;
      config.author.name = props.authorName;
      config.author.email = props.authorMail;
      config.directive.name = props.directiveName;
      config.service.name = props.serviceName;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {

      addFileJSON(this.templatePath('package.json'), this.destinationPath('package.json'), {
        name: config.name,
        author: {
          name: this.props.authorName,
          email: this.props.authorMail
        }
      });

      addFileJSON(this.templatePath('bower.json'), this.destinationPath('bower.json'), {
        name: config.name
      });

      var bo = require(this.templatePath('bower.json'));
      bo.name = this.props.name;
      bo.main.push('dist/' + this.props.name + '.min.js');
      this.fs.writeJSON(this.destinationPath('bower.json'), bo);



      this.fs.copy(
        this.templatePath('_directive.html'),
        this.destinationPath('src/my-directive.html'));
    },

    directive: function() {
      if (config.directive.name && config.directive.name !== '') {
        var directive = this.fs.read(this.templatePath('_directive.js'));
        directive = directive.replace('aee.', this.props.authorName + '.');
        directive = directive.replace('my-module', this.props.name);
        this.fs.write(this.destinationPath('src/my-directive.js'), directive);

        console.log('creation of directive : ', config.directive.name);
        var directive = this.fs.read(this.templatePath('_directive.spec.js'));
        directive = directive.replace('aee.my-module', this.props.authorName + '.' + this.props.name);
        this.fs.write(this.destinationPath('test/my-directive.js'), directive);
      }
    },

    serve: function() {
      this.fs.copy(
        this.templatePath('_page/home.html'),
        this.destinationPath('page/home.html'));
      this.fs.copy(
        this.templatePath('_page/home.controller.js'),
        this.destinationPath('page/home.controller.js'));

      var app = this.fs.read(this.templatePath('_app.js'));
      app = app.replace('aee.my-module', this.props.authorName + '.' + this.props.name);
      this.fs.write(this.destinationPath('app.js'), app);
    },

    projectfiles: function() {
      var rm = this.fs.read(this.templatePath('_README.md'));
      rm = rm.replace('my-module', this.props.name);
      this.fs.write(this.destinationPath('README.md'), rm);

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig'));
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'));
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('index.html'));
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('index.html'));
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc'));
      this.fs.copy(
        this.templatePath('jshintrc.spec'),
        this.destinationPath('test/.jshintrc'));
      this.fs.copy(
        this.templatePath('karma.conf.js'),
        this.destinationPath('karma.conf.js'));
      this.fs.copy(
        this.templatePath('Makefile'),
        this.destinationPath('Makefile'));
      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath('server.js'));
    }
  },

  install: function() {
    this.installDependencies();
  }
});