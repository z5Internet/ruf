"use strict";module.exports={childRoutes:[{path:"/password/reset",getComponent:function(e,n){require.ensure([],function(){n(null,require("./components/ForgottenPassword"))})}},{path:"/password/reset/:token",getComponent:function(e,n){require.ensure([],function(){n(null,require("./components/ResetPassword"))})}}]};