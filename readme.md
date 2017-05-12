# generate-image-preivew

Generate previews and thumbs folders and images.

### install

```
npm install -g generate-image-preivew
```

### use

`genprev [path]`

```
genprev ./

```

### dependency

if the console log "cannot find `convert` binary ..." , u should install `graphicsmagick` and `imagemagick`。



```
yum install imagemagick
yum install graphicsmagick

```

installation via yum/apt-get/brew depend on the System.



### api

`genprev [path]`

```
var genPrev = require('generate-image-preivew')
genPrev([..paths])

//genPrev('/home/hello/world')
//genPrev('./')

```
