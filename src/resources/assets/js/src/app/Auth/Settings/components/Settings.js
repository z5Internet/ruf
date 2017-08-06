"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_reactRedux=require("react-redux"),_reactRouter=require("react-router"),_reactstrap=require("reactstrap"),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_ProfilePic=require("./ProfilePic"),_ProfilePic2=_interopRequireDefault(_ProfilePic),_UserDetails=require("./UserDetails"),_UserDetails2=_interopRequireDefault(_UserDetails),_Security=require("./Security"),_Security2=_interopRequireDefault(_Security),_ChangeEmail=require("./ChangeEmail"),_ChangeEmail2=_interopRequireDefault(_ChangeEmail),_Teams=require("./Teams/Teams"),_Teams2=_interopRequireDefault(_Teams),_reduxConnect=require("../../../../utils/redux-connect"),_reduxConnect2=_interopRequireDefault(_reduxConnect),_customSettings=require("../../../../../../../../../../../../resources/assets/react-app/uiHooks/customSettings"),_customSettings2=_interopRequireDefault(_customSettings),Settings=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));a.state={tab:0,isOpen:!1},a.tabs=[{title:"Your details",url:"",component:_react2.default.createElement(_UserDetails2.default,null)},{title:"Profile picture",url:"profile",component:_react2.default.createElement(_ProfilePic2.default,null)},{title:"Security",url:"security",component:_react2.default.createElement(_Security2.default,null)},{title:"Verify Email",url:"changeEmail",dontShow:!0,component:_react2.default.createElement(_ChangeEmail2.default,{location:a.props.location})}];var r="./ruf-tag/src/resources/assets/js/src/app/Auth/TagSettings/components/TagSettings",s=require.context("../../../../../../../../../../",!0,/^\.\/ruf\-tag\/src\/resources\/assets\/js\/src\/app\/Auth\/TagSettings\/components\/TagSettings/);if(s.keys().indexOf(r)>=0){var n=s(r);a.tabs=a.tabs.concat({title:"Tags",url:"tags",component:_react2.default.createElement(n,null)})}a.props.website.multiAccounts&&a.tabs.push({title:a.props.website.multiAccounts.pluralLabel,url:"multiAccounts",component:_react2.default.createElement(_Teams2.default,{router:a.props.router})}),a.tabs=a.tabs.concat(_customSettings2.default);var l=a.props.location.pathname.replace(/\/settings\/?/,"");for(var i in a.tabs)l==a.tabs[i].url&&(a.state.tab=parseInt(i));return a}return _inherits(t,e),_createClass(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.location.pathname.replace(/\/settings\/?/,"");for(var a in this.tabs)t==this.tabs[a].url&&this.setState({tab:parseInt(a)})}},{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this;return _react2.default.createElement("div",{className:"container"},_react2.default.createElement("div",{className:"row"},_react2.default.createElement("div",{className:"col-md-4"},_react2.default.createElement(_reactstrap.Navbar,{light:!0,style:{padding:0},inverse:!0,className:"navbar-toggleable-sm"},_react2.default.createElement("button",{onClick:this.toggle.bind(this),className:"btn navbar-toggler btn-primary mb-2",style:{color:"#fff",backgroundColor:"#323284",borderColor:"#323284",padding:"0.5rem 1rem",fontSize:"1rem"}},_react2.default.createElement("span",{className:"navbar-toggler-icon mr-1"}),"Settings"),_react2.default.createElement(_reactstrap.Collapse,{isOpen:this.state.isOpen,navbar:!0},_react2.default.createElement("div",{className:"card mb-2",style:{width:"100%"}},_react2.default.createElement("div",{className:"card-block",style:{borderBottom:"1px solid rgba(0 ,0 ,0 , 0.1)"}},_react2.default.createElement("h4",{className:"card-title"},"Settings")),_react2.default.createElement("div",{className:"list-group list-group-flush"},this.tabs.map(function(t,a){if(!t.dontShow)return _react2.default.createElement(_reactRouter.Link,{to:"/settings"+(t.url?"/"+t.url:""),key:a,className:(0,_classnames2.default)("list-group-item",e.state.tab==a?"active":"list-group-item-action")},t.title)})))))),_react2.default.createElement("div",{className:"col-md-8"},_react2.default.createElement("div",{className:"card"},_react2.default.createElement("div",{className:"card-header"},this.tabs[this.state.tab].title),_react2.default.createElement("div",{className:"card-block"},_react2.default.createElement("div",{className:"card-text"},this.tabs[this.state.tab].component))))))}}]),t}(_react2.default.Component);module.exports=(0,_reactRouter.withRouter)((0,_reduxConnect2.default)(Settings,{website:"website"}));