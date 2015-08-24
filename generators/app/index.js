'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var c = require('./yo-rc.json');
var _ = require('lodash');

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
      default: 'AdrienEtienne'
    }, {
      type: 'input',
      name: 'authorMail',
      message: 'Your mail?',
      default: 'a.etienne92@gmail.com'
    }, {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: c.name
    }, {
      type: 'input',
      name: 'directiveName',
      message: 'You want create a directive?'
    }, {
      type: 'input',
      name: 'serviceName',
      message: 'You want create a service?'
    }];

    this.prompt(prompts, function(props) {
      props.authorName = _.camelCase(props.authorName);
      props.name = props.name.replace(' ', '-');
      props.directiveName = props.directiveName.replace(' ', '-');
      props.serviceName = props.serviceName.replace(' ', '-');
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var pkg = require(this.templatePath('package.json'));
      pkg = _.merge(pkg, {
        name: this.props.name,
        author: {
          name: _.camelCase(this.props.authorName),
          email: this.props.authorMail
        }
      });
      this.fs.writeJSON(this.destinationPath('package.json'), pkg);

      var bo = require(this.templatePath('bower.json'));
      bo.name = this.props.name;
      bo.main.push('dist/' + this.props.name + '.min.js');
      if (this.props.directiveName && this.props.directiveName !== '') {
        bo.main.push('dist/' + this.props.name + '.css');
      }
      this.fs.writeJSON(this.destinationPath('bower.json'), bo);
    },

    module: function() {
      var mod = this.fs.read(this.templatePath('module.js'));
      mod = mod.replace(
        c.author.name + '.' + c.name,
        this.props.authorName + '.' + this.props.name);
      this.fs.write(this.destinationPath('src/' + this.props.name + '.js'), mod);
    },

    page: function() {
      if (this.props.directiveName && this.props.directiveName !== '') {
        var home = this.fs.read(this.templatePath('page/home.html'));
        home = home.replace(c.directive.name, this.props.directiveName);
        home = home.replace(c.directive.name, this.props.directiveName);
        this.fs.write(this.destinationPath('page/home.html'), home);
      } else {
        this.fs.copy(
          this.templatePath('page/home.html'),
          this.destinationPath('page/home.html'));
      }

      this.fs.copy(
        this.templatePath('page/home.controller.js'),
        this.destinationPath('page/home.controller.js'));

      var app = this.fs.read(this.templatePath('app.js'));
      app = app.replace(c.author.name + '.' + c.name, this.props.authorName + '.' + this.props.name);
      this.fs.write(this.destinationPath('app.js'), app);
    },

    directive: function() {
      if (this.props.directiveName && this.props.directiveName !== '') {
        this.props.directiveName = this.props.directiveName.replace(' ', '-');

        this.fs.copy(
          this.templatePath('directive/directive.html'),
          this.destinationPath('src/directive/' + this.props.directiveName + '.html'));

        this.fs.copy(
          this.templatePath('directive/directive.less'),
          this.destinationPath('src/directive/' + this.props.directiveName + '.less'));

        var directive = this.fs.read(this.templatePath('directive/directive.js'));
        directive = directive.replace(
          c.author.name + '.' + c.name,
          this.props.authorName + '.' + this.props.name);
        directive = directive.replace(
          _.camelCase(c.directive.name),
          _.camelCase(this.props.directiveName));
        directive = directive.replace(
          c.directive.name,
          this.props.directiveName);
        this.fs.write(this.destinationPath('src/directive/' + this.props.directiveName + '.js'), directive);

        directive = this.fs.read(this.templatePath('directive/directive.spec.js'));
        directive = directive.replace(
          c.author.name + '.' + c.name,
          this.props.authorName + '.' + this.props.name);
        var find = c.directive.name;
        var re = new RegExp(find, 'g');
        directive = directive.replace(re, this.props.directiveName);
        this.fs.write(this.destinationPath('test/directive/' + this.props.directiveName + '.spec.js'), directive);
      }
    },

    service: function() {
      if (this.props.serviceName && this.props.serviceName !== '') {
        this.props.serviceName = this.props.serviceName.replace(' ', '-');

        var service = this.fs.read(this.templatePath('service/service.js'));
        service = service.replace(
          c.author.name + '.' + c.name,
          this.props.authorName + '.' + this.props.name);
        service = service.replace(
          _.camelCase(c.service.name),
          _.camelCase(this.props.serviceName));
        this.fs.write(this.destinationPath('src/service/' + this.props.serviceName + '.js'), service);

        service = this.fs.read(this.templatePath('service/service.spec.js'));
        service = service.replace(
          c.author.name + '.' + c.name,
          this.props.authorName + '.' + this.props.name);
        var find = _.camelCase(c.service.name);
        var re = new RegExp(find, 'g');
        service = service.replace(re, _.camelCase(this.props.serviceName));
        this.fs.write(this.destinationPath('test/service/' + this.props.serviceName + '.spec.js'), service);
      }
    },

    projectfiles: function() {
      var rm = this.fs.read(this.templatePath('README.md'));
      rm = rm.replace(c.name, this.props.name);
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
