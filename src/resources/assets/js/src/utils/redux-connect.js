"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _react=require("react"),_react2=_interopRequireDefault(_react),_reactRedux=require("react-redux"),redux_connect=function(e,r){function t(e){var t={};for(var n in r)t[n]=e[r[n]];return t}function n(e){return{}}function u(e,r,t){return Object.assign({},e,t)}return e.contextTypes={store:_react2.default.PropTypes.object},(0,_reactRedux.connect)(t,n,u)(e)};module.exports=redux_connect;