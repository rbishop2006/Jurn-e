(this.webpackJsonpboilerplate=this.webpackJsonpboilerplate||[]).push([[3],{144:function(t,n,e){t.exports=e(282)},149:function(t,n,e){},158:function(t,n){},160:function(t,n){},174:function(t,n){},176:function(t,n){},204:function(t,n){},206:function(t,n){},207:function(t,n){},212:function(t,n){},214:function(t,n){},221:function(t,n){},223:function(t,n){},241:function(t,n){},244:function(t,n){},260:function(t,n){},263:function(t,n){},282:function(t,n,e){"use strict";e.r(n);var c={};e.r(c),e.d(c,"MainState",(function(){return b.a})),e.d(c,"AsideState",(function(){return O.a})),e.d(c,"Phase2State",(function(){return y.a})),e.d(c,"Phase1State",(function(){return S.a})),e.d(c,"RemindersState",(function(){return _.a})),e.d(c,"ActivitiesState",(function(){return E.a})),e.d(c,"InviteState",(function(){return P.a})),e.d(c,"MessageState",(function(){return w.a}));var i=e(0),a=e.n(i),u=e(39),r=e.n(u),o=(e(149),e(49)),s=e(9),f=e(2),d=(e(280),a.a.lazy((function(){return Promise.all([e.e(0),e.e(8)]).then(e.bind(null,744))}))),l=a.a.lazy((function(){return Promise.all([e.e(0),e.e(1),e.e(9)]).then(e.bind(null,745))})),p=a.a.lazy((function(){return Promise.all([e.e(0),e.e(1),e.e(2),e.e(10)]).then(e.bind(null,749))})),h=a.a.lazy((function(){return Promise.all([e.e(0),e.e(1),e.e(2),e.e(6),e.e(7)]).then(e.bind(null,750))})),m=function(t){return a.a.createElement(f.AuthProvider,{redirectUrl:"/Jurne"},a.a.createElement(o.BrowserRouter,null,a.a.createElement("div",{className:"app"},a.a.createElement(i.Suspense,{fallback:a.a.createElement("div",null,"Loading...")},a.a.createElement(s.d,{exact:!0,path:"/Jurne",component:d}),a.a.createElement(s.d,{path:"/login",component:l}),a.a.createElement(s.d,{path:"/register",component:p}),a.a.createElement(s.d,{exact:!0,path:"/",render:function(){return a.a.createElement(s.c,{to:"/Jurne"})}}),a.a.createElement(f.AuthRoute,{path:"/Jurne/:page",component:h})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=e(4),j=e(24),g=e(143),b=e(73),O=e(74),y=e(75),S=e(76),_=e(77),E=e(78),P=e(79),w=e(80),A=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||j.d,T=Object(j.c)(c),I=A(Object(j.a)(g.a)),R=Object(j.e)(T,I);r.a.render(a.a.createElement(v.a,{store:R},a.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},73:function(t,n,e){"use strict";e.d(n,"b",(function(){return r}));var c=e(6),i=e(4),a=e(2),u={jurns:[]};function r(){var t=Object(i.b)();return{jurns:Object(i.c)((function(t){return t.MainState.jurns})),get:function(){return t((function(t){a.api.get("/main").then((function(n){t({type:"MAIN/GET_Main",payload:{jurns:n.main}})})).catch()}))},sendJurn:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.post("/jurn",{user_id:t,jname:n}).then((function(t){e(t.id)})).catch((function(t){c()}))}))}(t,n)}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"MAIN/GET_Main":return Object(c.a)(Object(c.a)({},t),n.payload);default:return t}}},74:function(t,n,e){"use strict";e.d(n,"b",(function(){return o}));var c=e(6),i=e(4),a=e(2),u={jurns:[],user:{},pendJurns:[]};function r(){return function(t){a.api.get("/aside").then((function(n){t({type:"aside/GET_ASIDE",payload:{jurns:n.aside.jurns,user:n.aside.user,pendJurns:n.aside.pendJurns}})})).catch()}}function o(){var t=Object(i.b)();return{aJurns:Object(i.c)((function(t){return t.AsideState.jurns})),aUser:Object(i.c)((function(t){return t.AsideState.user})),pendingJurns:Object(i.c)((function(t){return t.AsideState.pendJurns})),delJurn:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.patch("/removejurne",{user_id:t,jurn_id:n}).then((function(t){e(t)})).catch((function(t){c()}))}))}(t,n)},fetchAside:function(){return t(r())},sendProfile:function(n,e,c,i,u){return t(function(t,n,e,c,i){return function(u){a.api.patch("/updateprofile",{fname:t,lname:n,cellphone:e,avatar:c,user_id:i}).then((function(t){u(r())})).catch((function(t){console.error(t)}))}}(n,e,c,i,u))},sendDecline:function(n,e){return t(function(t,n){return function(e){a.api.patch("/updateDecline",{user_id:t,jurn_id:n}).then((function(t){e(r())})).catch((function(t){console.error(t)}))}}(n,e))},sendAccept:function(n,e){return t(function(t,n){return function(e){a.api.patch("/updateaccept",{user_id:t,jurn_id:n}).then((function(t){e(r())})).catch((function(t){console.error(t)}))}}(n,e))}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"aside/GET_ASIDE":return Object(c.a)(Object(c.a)({},t),n.payload);default:return t}}},75:function(t,n,e){"use strict";e.d(n,"b",(function(){return r}));var c=e(6),i=e(4),a=e(2),u={jurnInfo:{},activities:[]};function r(){var t=Object(i.b)();return{jurnInfo:Object(i.c)((function(t){return t.Phase2State.jurnInfo})),activities:Object(i.c)((function(t){return t.Phase2State.activities})),updatePhase2:function(n){return t(function(t){return function(n){a.api.get("/phase2/"+t).then((function(t){n({type:"phase2/GET_PHASE2",payload:t.phase2})})).catch()}}(n))}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"phase2/GET_PHASE2":return Object(c.a)(Object(c.a)({},t),{},{jurnInfo:n.payload.jname,activities:n.payload.activities});default:return t}}},76:function(t,n,e){"use strict";e.d(n,"b",(function(){return r}));var c=e(6),i=e(4),a=e(2),u={locations:[],hotels:[],dateRanges:[],jname:{}};function r(){var t=Object(i.b)();return{jname:Object(i.c)((function(t){return t.Phase1State.jname})),locations:Object(i.c)((function(t){return t.Phase1State.locations})),hotels:Object(i.c)((function(t){return t.Phase1State.hotels})),dateRanges:Object(i.c)((function(t){return t.Phase1State.dateRanges})),updatePhase1:function(n){return t(function(t){return function(n){a.api.get("/phase1/"+t).then((function(t){n({type:"phase1/GET_PHASE1",payload:{locations:t.phase1.locations,jname:t.phase1.jname,hotels:t.phase1.hotels,dateRanges:t.phase1.dateRange}})})).catch()}}(n))},sendLocation:function(n,e){t(function(t,n){return function(e){a.api.post("/location",{location:t,jurn_id:n}).catch()}}(n,e))},sendHotel:function(n,e){t(function(t,n){return function(e){a.api.post("/hotel",{hotel:t,jurn_id:n}).catch()}}(n,e))},sendDates:function(n,e){t(function(t,n){return function(e){a.api.post("/dates",{date:t,jurn_id:n}).catch()}}(n,e))},updateFinalDates:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.patch("/finaldates",{date:t,jurn_id:n}).then((function(){e(n)})).catch((function(t){c(t)}))}))}(t,n)},updateFinalLocation:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.patch("/finallocation",{location:t,jurn_id:n}).then((function(){e(n)})).catch((function(t){c(t)}))}))}(t,n)},updateFinalHotel:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.patch("/finalhotel",{hotel:t,jurn_id:n}).then((function(){e(n)})).catch((function(t){c(t)}))}))}(t,n)},updatePhoto:function(t,n){return function(t,n){return new Promise((function(e,c){a.api.patch("/finalphoto",{jurn_id:t,photo:n}).then((function(){e(t)})).catch((function(t){c(t)}))}))}(t,n)}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"phase1/GET_PHASE1":return Object(c.a)(Object(c.a)({},t),n.payload);default:return t}}},77:function(t,n,e){"use strict";e.d(n,"b",(function(){return f}));var c=e(6),i=e(4),a=e(2),u="reminders/GET_REMS",r={rems:[],remsCount:0};function o(t,n){return function(e){a.api.get("/reminders/".concat(t,"/").concat(n)).then((function(c){e(s(t,n)),e({type:u,payload:c})}))}}function s(t,n){return function(e){a.api.get("/reminders/".concat(t,"/").concat(n,"?status=active")).then((function(t){e({type:"reminders/SET_REMSCOUNT",payload:t.length})}))}}function f(){var t=Object(i.b)();return{rems:Object(i.c)((function(t){return t.RemindersState.rems})),remsCount:Object(i.c)((function(t){return t.RemindersState.remsCount})),addRem:function(n,e,c){return t(function(t,n,e){return function(c){a.api.post("/addrem",{reminder:t,jurn_id:n,user_id:e}).then((function(t){c(o(n,e))}))}}(n,e,c))},toggleRem:function(n,e,c){return t(function(t,n,e){return function(c){a.api.get("/togglerem/"+t).then((function(t){var i=t.status,u=t.rem_id;"completed"===i?a.api.patch("/reminder",{rem_id:u,status:"active"}).then((function(t){c(o(n,e))})):a.api.patch("/reminder",{rem_id:u,status:"completed"}).then((function(t){c(o(n,e))}))}))}}(n,e,c))},filterRems:function(n,e,c){return t(function(t,n,e){return function(c){var i="";"all"===t?i="":"completed"===t?i="?status=completed":"active"===t&&(i="?status=active"),a.api.get("/reminders/".concat(n,"/").concat(e).concat(i)).then((function(t){c({type:u,payload:t}),c(s(n,e))}))}}(n,e,c))},clearRems:function(n,e){return t(function(t,n){return function(e){a.api.get("/reminders/".concat(t,"/").concat(n,"?status=completed")).then((function(c){Promise.all(c.map((function(t){return new Promise((function(n,e){a.api.delete("/reminder/"+t.rem_id).then((function(t){n()}))}))}))).then((function(c){e(o(t,n))}))}))}}(n,e))},updateRems:function(n,e){return t(o(n,e))}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case u:return Object(c.a)(Object(c.a)({},t),{},{rems:n.payload});case"reminders/SET_REMSCOUNT":return Object(c.a)(Object(c.a)({},t),{},{remsCount:n.payload});default:return t}}},78:function(t,n,e){"use strict";e.d(n,"b",(function(){return f}));var c=e(6),i=e(4),a=e(2),u="activities/GET_ACTS",r={acts:[],actsCount:0};function o(t){return function(n){a.api.get("/activities/"+t).then((function(e){n(s(t)),n({type:u,payload:e})}))}}function s(t){return function(n){a.api.get("/activities/".concat(t,"?status=active")).then((function(t){n({type:"activities/SET_ACTSCOUNT",payload:t.length})}))}}function f(){var t=Object(i.b)();return{acts:Object(i.c)((function(t){return t.ActivitiesState.acts})),actsCount:Object(i.c)((function(t){return t.ActivitiesState.actsCount})),addAct:function(n,e){return t(function(t,n){return function(e){a.api.post("/addact",{activity:t,jurn_id:n}).then((function(t){e(o(n))}))}}(n,e))},toggleAct:function(n,e){return t(function(t,n){return function(e){a.api.get("/toggleact/"+t).then((function(t){console.log(t);var c=t.status,i=t.act_id;"completed"===c?a.api.patch("/activity",{act_id:i,status:"active"}).then((function(t){e(o(n))})):a.api.patch("/activity",{act_id:i,status:"completed"}).then((function(t){e(o(n))}))}))}}(n,e))},filterActs:function(n,e){return t(function(t,n){return function(e){var c="";"all"===t?c="":"completed"===t?c="?status=completed":"active"===t&&(c="?status=active"),a.api.get("/activities/".concat(n).concat(c)).then((function(t){e({type:u,payload:t}),e(s(n))}))}}(n,e))},clearActs:function(n){return t(function(t){return function(n){a.api.get("/activities/".concat(t,"?status=completed")).then((function(e){Promise.all(e.map((function(t){return new Promise((function(n,e){a.api.delete("/activity/"+t.act_id).then((function(t){n()}))}))}))).then((function(e){n(o(t))}))}))}}(n))},updateActs:function(n){return t(o(n))}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case u:return Object(c.a)(Object(c.a)({},t),{},{acts:n.payload});case"activities/SET_ACTSCOUNT":return Object(c.a)(Object(c.a)({},t),{},{actsCount:n.payload});default:return t}}},79:function(t,n,e){"use strict";e.d(n,"b",(function(){return o}));var c=e(6),i=e(4),a=e(2),u="inviteUsers/GET_INVITED",r={pending:[],accepted:[],declined:[]};function o(){var t=Object(i.b)();return{pending:Object(i.c)((function(t){return t.InviteState.pending})),accepted:Object(i.c)((function(t){return t.InviteState.accepted})),declined:Object(i.c)((function(t){return t.InviteState.declined})),updateInvited:function(n){return t(function(t){return function(n){a.api.get("/invited/"+t).then((function(t){n({type:u,payload:{pending:t.invited.pending,accepted:t.invited.accepted,declined:t.invited.declined}})})).catch()}}(n))},sendInvite:function(t,n,e){return function(t,n,e){return new Promise((function(c,i){a.api.post("/invite",{firstName:t,lastName:n,jurn_id:e}).then((function(t){c(t)})).catch((function(t){i()}))}))}(t,n,e)}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case u:return Object(c.a)(Object(c.a)({},t),n.payload);default:return t}}},80:function(t,n,e){"use strict";e.d(n,"b",(function(){return r}));var c=e(6),i=e(4),a=e(2),u={msgs:[]};function r(){var t=Object(i.b)();return{messages:Object(i.c)((function(t){return t.MessageState.msgs})),getMessages:function(){return t((function(t){a.api.get("/messages").then((function(n){t({type:"chatroom/GET_MESSAGES",payload:{msgs:n.messages}})})).catch()}))},sendMessage:function(t,n,e){return function(t,n,e){return new Promise((function(c,i){a.api.post("/message",{user_id:t,jurnId:n,message:e}).then((function(t){c(t)})).catch((function(t){i()}))}))}(t,n,e)}}}n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"chatroom/GET_MESSAGES":return Object(c.a)(Object(c.a)({},t),n.payload);default:return t}}}},[[144,4,5]]]);
//# sourceMappingURL=main.9607bbaf.chunk.js.map