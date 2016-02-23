import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const SearchVisualWrap = React.createClass({
  render() {
      return this.props.children
  }
  // render() {
  //   const { pathname } = this.props.location
  //   const key = pathname.split('/').reverse()[1];
  //   const reg = new RegExp('/'+this.props.params.orgId+'/search/vs/$');
  //   const isVisualIndex = reg.test(pathname);
  //
  //   return (
  //     <ReactCSSTransitionGroup
  //         component="div" transitionName="swap"
  //         transitionEnterTimeout={500} transitionLeaveTimeout={500}
  //       >
  //       {React.cloneElement(this.props.children, { key: key })}
  //     </ReactCSSTransitionGroup>
  //   )
  // }
});

export default SearchVisualWrap;
