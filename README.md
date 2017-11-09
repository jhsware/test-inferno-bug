1 Install and start server

```
$ npm install
$ npm start
```

1 Open the console and click the link, you will get:

  Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

It appears that Inferno tries to remove the children twice.