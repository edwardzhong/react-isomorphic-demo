import { createReducer } from 'redux-act';
import {sortByTime,sortByRate,sortByHot,addList} from '../actions';

const listState=createReducer({
	[addList]:(state,payload)=>[...payload],
	[sortByTime]:(state)=>{
		state.sort((a,b)=>new Date(b.time)-new Date(a.time));
		return [...state];
	},
	[sortByHot]:(state)=>{
		state.sort((a,b)=>b.hots-a.hots);
		return [...state];
	},
	[sortByRate]:(state)=>{
		state.sort((a,b)=>b.rate-a.rate);
		return [...state];
	}
},[]);

export default listState