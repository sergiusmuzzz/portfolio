Jira GISW-830

# Install
This project requires [NodeJs](http://nodejs.org/), [Ruby](http://www.ruby-lang.org), [Grunt](http://gruntjs.com/), [Compass](http://compass-style.org/), & [Bower](http://bower.io/).

Once you have all prerequisites, you will just need to install bower components and npm modules.

```bash
bower install
npm install
```

# Run Project
To run the project locally, we use grunt.

For development, type:
```bash
grunt
```

You should see the project start to build and will run locally when finished.  In this mode, grunt will "watch" for changes and automatically rebuild the project if you modify any source files.

# Build Project for Production
To build the project for use on a production environment, type:
```bash
grunt build
```

This will build the project and place all files necessary to run the project into the "build" folder.  Once done, it will also startup a local server with the project running.

In this mode, js and css files will be concatenated and minified.

