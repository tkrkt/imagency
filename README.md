# imagency
Dynamic image generator for markdown writing

## Quick start

### Step 1. install & start

```
$ git clone https://github.com/tkrkt/imagency.git
$ cd imagency
$ npm install
$ PORT=8888 node index.js
```

imagency depends on node-canvas.

See [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki) to install node-canvas.


### Step 2. write markdown

Write image tag in your favorite markdown editor:

```
![alt](http://127.0.0.1:8888/text/
text=Hello!
)
```

then you can get generated image.

![](./sample.png)