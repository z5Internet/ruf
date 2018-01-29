"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_reduxConnect=require("./redux-connect"),_reduxConnect2=_interopRequireDefault(_reduxConnect),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_http=require("rufUtils/http"),_http2=_interopRequireDefault(_http),_reactRouterDom=require("react-router-dom"),_alert=require("rufUtils/modals/alert"),_alert2=_interopRequireDefault(_alert),_modal=require("rufUtils/modals/modal"),_modal2=_interopRequireDefault(_modal),_errorModal=require("rufUtils/errorModal"),_errorModal2=_interopRequireDefault(_errorModal),_scriptjs=require("scriptjs"),_scriptjs2=_interopRequireDefault(_scriptjs),StripePayForm=function(e){function t(e,r){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={stripeLoaded:!1,gotData:!1,name:e.user.first_name+" "+e.user.last_name,email:e.user.email,tel:""},a.store=r.store,a.launchStripe=a.launchStripe.bind(a),a.stripe=null,a.card=null,a.formSubmit=a.formSubmit.bind(a),a}return _inherits(t,e),_createClass(t,[{key:"componentWillUnmount",value:function(){this.unmounted=!0}},{key:"componentDidMount",value:function(){this.load();var e=this;(0,_scriptjs2.default)("https://js.stripe.com/v3/",function(){e.launchStripe("stripeLoaded")})}},{key:"load",value:function(){var e=this;this.props.user.currentTeam.id;_http2.default.post("/data/payment/addProduct/"+this.props.productId).then(function(t){switch(t.result){case"successful":return void _http2.default.get("/data/start").then(function(t){e.store.dispatch({type:"STORE_USER",user:t.user}),e.stripeReturn()});case"alreadySubscribed":e.stripeReturn();break;case"requiresPaymentInfo":e.launchStripe("gotData");break;case"failed":(0,_alert2.default)("payment error","Error","There was an error with your payment.");break;case"No product":(0,_alert2.default)("no product error","Error","Product "+e.props.productId+" doesn't exist")}e.launchStripe("gotData"),_modal2.default.close("1m")})}},{key:"launchStripe",value:function(e){var t=this,r={};r[e]=!0;var a=this;this.setState(r,function(e){t.state.stripeLoaded&&t.state.gotData&&setTimeout(function(){a.stripeHandler()},1)})}},{key:"stripeReturn",value:function(){this.props.history.push(this.props.returnURL)}},{key:"stripeHandler",value:function(){if(this.sth)return this.sth;this.stripe=Stripe(this.props.website.stripe_key),this.stripeElements=this.stripe.elements(),this.card=this.stripeElements.create("card",{style:{base:{fontSize:"16px",lineHeight:"24px"},invalid:{color:"red"}}}),this.card.mount("#card-element")}},{key:"stripeTokenHandler",value:function(e){var t=this;_http2.default.post("/data/payment/stripe/token",{token:e}).then(function(e){t.load()})}},{key:"createToken",value:function(){var e=this,t=this.state;t.name,t.email,t.tel;if(!this.state.name||!this.state.email||!this.state.tel)return void(0,_errorModal2.default)("Please enter all the payment details");(0,_alert2.default)("1m","","One moment",!1),this.stripe.createToken(this.card).then(function(t){t.error?((0,_errorModal2.default)(t.error.message),_modal2.default.close("1m")):e.stripeTokenHandler(t.token)})}},{key:"formSubmit",value:function(e){e.preventDefault(),this.createToken()}},{key:"render",value:function(){var e=this;return this.state.stripeLoaded&&this.state.gotData?_react2.default.createElement("div",{id:"payment-form"},_react2.default.createElement("div",{className:"p-3 mb-3"},_react2.default.createElement("div",{className:"form-group row"},_react2.default.createElement("label",{htmlFor:"card-name-field",className:"col-sm-2 col-form-label"},"Name"),_react2.default.createElement("div",{className:"col-sm-10"},_react2.default.createElement("input",{className:"form-control",type:"text",value:this.state.name,id:"card-name-field",onChange:function(t){e.setState({name:t.target.value})}}))),_react2.default.createElement("div",{className:"form-group row"},_react2.default.createElement("label",{htmlFor:"card-email-field",className:"col-sm-2 col-form-label"},"Email"),_react2.default.createElement("div",{className:"col-sm-10"},_react2.default.createElement("input",{className:"form-control",type:"email",value:this.state.email,id:"card-email-field",onChange:function(t){e.setState({email:t.target.value})}}))),_react2.default.createElement("div",{className:"form-group row"},_react2.default.createElement("label",{htmlFor:"card-tel-field",className:"col-sm-2 col-form-label"},"Phone number"),_react2.default.createElement("div",{className:"col-sm-10"},_react2.default.createElement("input",{className:"form-control",type:"tel",value:this.state.tel,id:"card-tel-field",onChange:function(t){e.setState({tel:t.target.value})}}))),_react2.default.createElement("div",{className:"form-group row"},_react2.default.createElement("label",{htmlFor:"card-email-field",className:"col-sm-2 col-form-label"},"Card number"),_react2.default.createElement("div",{className:"col-sm-10"},_react2.default.createElement("div",{className:"form-control",style:{height:"38px"}},_react2.default.createElement("div",{id:"card-element"})))),_react2.default.createElement("div",{id:"card-errors",role:"alert"})),_react2.default.createElement("button",{className:"btn btn-primary",onClick:this.formSubmit},"Send Payment")):_react2.default.createElement("div",{className:"text-center"},_react2.default.createElement("div",{className:"fa fa-3x fa-cog fa-spin"}))}}]),t}(_react.Component);module.exports=(0,_reactRouterDom.withRouter)((0,_reduxConnect2.default)(StripePayForm,{user:"user",website:"website"}));