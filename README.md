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

### Step 2. write markdown

In your favorite markdown editor,

```
![alt](http://127.0.0.1:8888/text
{
  "text": "hello!"
}
)
```

![alt](http://127.0.0.1:8888/text/{"text": "hello!"})
