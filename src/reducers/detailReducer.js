import { createReducer } from 'redux-act';
import {setDetail} from '../actions';

const detailState=createReducer({
	[setDetail]:(state,payload)=>{ return {...payload}}
},{
	"title": "",
	"url": "",
	"rate": 0,
	"cover": "",
	"short_comment": {
		"content": "",
		"author": ""
	},
	"directors": [],
	"actors": [],
	"duration": "",
	"region": "",
	"id": "",
	"types": [],
	"release_time": ""
});

export default detailState