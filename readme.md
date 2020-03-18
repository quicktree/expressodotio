
  

# expressodotio

  

A simple server for lots of things.

## Quickstart

In your favourite terminal

  

	npm i -g expressodotio

  

Find a directory with any file inside and cd into it

  

	expressodotio

Head to http://localhost:3000/<filename\>

Done! Files are now being served from your directory

## Flags

  

| Flag | Example usage | Description |
| :------------- | :---------- | :----------- |
| port | \-\-port 4040 | The server will run on this port, defaults to 3000 |
| mode | \-\-mode static | static \| spa (more later) |
| staticFiles| \-\-staticFiles C:\Users\<user>\dir| Defines which directory static files will be served from, defaults to ./ and can be either absolute or relative|
| staticPath| \-\-staticPath /test| Defines which context static files will be served under, defaults to /|
| help| \-\-help| Prints flags and instructions|
| v| \-\-v| Prints request information for each request. Standard verbose|
| vv| \-\-vv| Quite verbose|
| vvv| \-\-vvv| Hella verbose|
  

## Modes

  

The server can run in different modes for different purposes

  

### Static

  

A simple static file server, serves everything in the specified directory --staticFiles (default is ./) under the context specified by --staticPath (default is /).

### SPA

Similar to static mode except resources that cannot be found will respond with the index.html. This way any route resolution will be handled by the single page application router.

## Examples
	expressodotio

will serve everything in the current directory under http://localhost:3000/.

Let's suppose you have a file named notes.txt, if you head to http://localhost:3000/notes.txt, there you will find the file.

	expressodotio --staticPath /application

In this situation, your file notes.txt will be served at http://localhost:3000/application/notes.txt.

	expressodotio --staticPath /application --staticFiles ./public

With the staticFiles flag we're specifying that we want to use the contents of ./public as static files, and they will be served under /application.
#### index.html

In any case, if a file named index.html is found in your files directory, it will be served under the current staticPath, which defaults to / if not specified.
#### Middleware

It is possible to include any number of middlewares with a similar syntax:

	expressodotio middleware1.s middleware2.js
They will be called on every request in the same order as specified when starting expressodotio

middleware1.js could look like this:

	module.exports  =  function(req,  res,  next)  {  
		console.log("Middleware")
		next() 
	}
Calling next() is very important as not doing so will fail to pass the request to any additional middleware, stalling your call indefinitely