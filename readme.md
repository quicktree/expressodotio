# Expresso
A simple server for lots of things.
## Flags
- \-\-port:&lt;number&gt; Defines what port the server will run on
- \-\-mode:&lt;static&gt; Defines what mode the server will be run in
- \-\-staticDirectory:&lt;string&gt; Defines what directory will be used for static files
## Flags explained
| Flag       | Example usage     | Description     |
| :------------- | :---------- | :----------- |
|  port | \-\-port:4040   | The server will run on this port, defaults to 3000    |
| mode   | \-\-mode:static | static : spa (more later) |
|  staticDirectory| \-\-staticDirectory:C:\Users\<user>\dir| Defines which directory static files will be served from, defaults to ./static |
## Modes
The server can run in different modes for different purposes
### Static
A simple static file server, serves everything in the specified directory (\-\-staticDirectory) under ./static, if it finds an index.html it will serve it under /. Every requested resource that's not available will result in an error message. Unsuitable for SPA use (look below).
### SPA
Similar to static mode except resources that cannot be found will respond with the index.html. Much more SPA friendly.