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
![alt](http://127.0.0.1:[PORT]/[PluginName]/[Code])
```

e.g.

```
![alt](http://127.0.0.1:8888/text/
  text=Hello!
)
```

then you can get generated image in preview pane.

![](./sample.png)

enjoy!

## Caution

Imagency increases the vulnerability of your browser.
You should use this tool only when needed.

## Plugins

### text

generates png image from text.

* codeType: json/ini
* params
    * text
    * font
    * textColor
    * bgColor
    * lineSpacing
    * paddng

See [text2png](https://github.com/tkrkt/text2png) for details of params.

JSON(JSON5) style:

```
![](http://127.0.0.1:8888/text/
{
  text: 'The quick brown fox',
  font: '30px Futura'
  textColor: 'red'
}
)
```

ini style:

```
![](http://127.0.0.1:8888/text/
text=The quick brown fox
font=30px Futura
textColor=red
)
```

### eval

evaluates JavaScript code represented as a string.

* codeType: string
* param: JavaScript code

```
![](http://127.0.0.1:8888/eval/
[1,2,3,4].map(a=>a*2).reduce((a,b) => {
  return a*b;
}, 1);
```

### plot

renders functions with [function-plot](https://github.com/maurizzzio/function-plot) configurations.

* codeType: json/ini
* param: options of function-plot

```
![](http://127.0.0.1:8888/plot/
  {
    data: [
      { fn: 'x^2' },
      { fn: 'sin\(x\)'}
    ]
  }
)
```

### webshot

captures website snapshot with [webshot](https://github.com/brenden/node-webshot).

* codeType: string
* param: url

```
![](http://127.0.0.1/webshot/
http://google.com
)
```

### uiflow

generates [uiflow(Japanese)](https://github.com/hirokidaichi/uiflow) graph.

* codeType: string
* param: uiflow text

Use tilde insteads of hyphen.

```
[最初に]
ユーザーが見るものを書きます。
~~
ユーザーがする行動を書きます。
[次に]
ユーザーが見るもの
~~
ユーザーがすること１
==> その結果１
ユーザーがすること２
==> その結果２
[その結果１]
結果
[その結果２]
結果
```
