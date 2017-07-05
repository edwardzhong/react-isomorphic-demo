import React from 'react';
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux';
import { Provider,connect } from 'react-redux'
import { RoutingContext, match } from 'react-router';
import { StaticRouter } from 'react-router'
import {readFileSync} from 'fs'
import list from './datas/list.json'
import rootReducer from './src/reducers'
import Home from './src/containers/Home'

export default function handleRender() {
	// fill data
	let listState=list.sort((a,b)=>b.hots-a.hots);
	const store = createStore(rootReducer, {listState:listState}); 
	// render to html
	const context={};
	const html = renderToString(
		<Provider store={store} context={context}>
			<StaticRouter>
	      		<Home/>
	    	</StaticRouter>
    	</Provider>
	)
	// 获取出初始状态，并写入到页面全局变量里面
	const initialState = store.getState();
	// 读取webpack生成的html模版，并填充html和initialState
	let pageText = readFileSync('./build/list.html','utf8');
	return pageText.replace('{{html}}',html).replace('{{initialState}}',JSON.stringify(initialState));
};