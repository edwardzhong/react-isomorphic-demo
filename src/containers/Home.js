import React, { Component } from 'react'
import { Provider,connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import * as actions from '../actions'
import List from '../components/List'

export class Home extends Component {
    render() {
        const { listState,sortByHot,sortByTime,sortByRate } = this.props;
        return ( 
            <CSSTransitionGroup component="div" transitionName="example" 
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
            >
                    <div className="sort-wrap">
                    <div><input type="radio" name="sort" onClick={sortByHot} defaultChecked id="hot" /><label htmlFor="hot"> 按热度排序: </label></div>
                    <div><input type="radio" name="sort" onClick={sortByTime} id="time" /><label htmlFor="time"> 按时间排序 </label></div>
                    <div><input type="radio" name="sort" onClick={sortByRate} id="rate" /><label htmlFor="rate"> 按评价排序 </label></div> 
                </div>
                <List filmList={listState} />
            </CSSTransitionGroup>
        )
    }
}

export default  connect(
  (state) => { return{...state} },
  () => { return {...actions} }
)(Home);
