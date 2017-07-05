# react-isomorphic-demo
react, isomorphic, koa2

## run project
```
npm install
npm run production
npm start

```
## Technology used
1. koa2, koa-router, koa-logger
2. mobile web site, html5/css3
3. pre-compiler less
4. react, redux, react-redux, react-router, redux-act, react-transition-group
5. isomorphic


## directory structure

```bash
.
├── build                        # dist folder
│   ├── app.bundle.xxx.js        # app js
│   ├── list.html                # template
│   ├── main.css                 # style
│   └── vendor.bundle.xx.js      # common js  
├── datas                        # json Data
├── src                          # front-end source folder(react)
│   ├── actions                  # action folder
│   ├── common                   # utility folder
│   ├── components               # component folder
│   ├── containers               # container folder
│   ├── less                     # less folder
│   ├── reducers                 # reducer folder
│   ├── configStore              # configStore file
│   ├── img                  	 # image folder
│   ├── index.html               # html temlate
│   └── index.js                 # react entry
├── app.js               		 # koa server
├── package.json             	 # project description 
├── reactRender.js               # react isomorphic function
├── runServer.js              	 # project entry
├── webpack.config.js            # webpack develop config
└── webpack.production.config.js # webpack production config
```