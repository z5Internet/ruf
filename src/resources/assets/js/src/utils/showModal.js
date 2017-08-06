"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_reactstrap=require("reactstrap"),CreateModal=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.toggle=r.toggle.bind(r),r.state={modal:!0},r}return _inherits(t,e),_createClass(t,[{key:"toggle",value:function(){this.setState({modal:!this.state.modal}),this.deleteModal()}},{key:"deleteModal",value:function(){var e=document.getElementById(this.props["data-id"]);e.parentNode.removeChild(e)}},{key:"render",value:function(){return _react2.default.createElement(_reactstrap.Modal,{isOpen:this.state.modal,toggle:this.toggle},_react2.default.createElement(_reactstrap.ModalHeader,null,this.props["data-title"]),_react2.default.createElement(_reactstrap.ModalBody,null,this.props["data-message"]),_react2.default.createElement(_reactstrap.ModalFooter,null,_react2.default.createElement("button",{type:"button",className:"btn btn-default",onClick:this.toggle.bind(this)},"Close")))}}]),t}(_react.Component),showModal=function(e,t){var r="EM"+(new Date).getTime(),a=document.createElement("div");a.id=r,document.body.appendChild(a),(0,_reactDom.render)(_react2.default.createElement(CreateModal,{"data-title":e,"data-message":t,"data-id":r}),document.getElementById(r))};module.exports=showModal;