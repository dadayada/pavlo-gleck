(this.webpackJsonppeople=this.webpackJsonppeople||[]).push([[0],{75:function(e,t,n){e.exports=n(87)},86:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(25),l=n.n(c),o=n(32),i=n(28),u=n(65),d=n(30),s=n(102),b=n(88),m=n(10),f=n(27),O=n(9),j=n(7),g=n(107),p=n(103),v=n(89),E=n(96),k=n(97),h=n(99),y=n(3),w=Object(y.d)(),C=Object(y.j)(w.map((function(e){return e.target.value})),""),I=Object(y.d)(),N=Object(y.d)();function z(){var e=Object(j.b)(),t=Object(f.a)(e,2),n=t[0],a=t[1],c=Object(O.d)(C),l=Object(i.f)();return r.a.createElement("section",{className:n({position:"sticky",top:a.sizing.scale300,display:"flex"})},r.a.createElement(E.a,{placeholder:"Search person",value:c,onChange:w,startEnhancer:r.a.createElement(k.a,{size:a.sizing.scale800})}),r.a.createElement(g.a,{content:function(e){var t=e.close;return r.a.createElement(p.a,{items:[{label:"Add person"},{label:"Add category"},{label:"Edit categories"}],onItemSelect:function(e){var n=e.item;t(),function(e,t){switch(e.label){case"Add category":N();break;case"Add person":I();break;case"Edit categories":t.push("/pavlo-gleck/edit-categories")}}(n,l)}})}},r.a.createElement(v.a,null,r.a.createElement(h.a,{size:"scale800"}))))}var x=n(104),A=n(61),F=n(45),S=n(48),D=n.n(S),P=D()("people/$people"),$=D()("people/$categories"),B=D()("people/$peopleInfo"),J=Object(y.e)(P.init([])),L=Object(y.e)($.init([])),R=Object(y.e)(B.init({}));J.watch(P),L.watch($),R.watch(B);var W=Object(y.b)(C,J,(function(e,t){return t.filter((function(t){return t.fullName.toLowerCase().includes(e.toLowerCase())}))})),H=Object(y.d)(),q=Object(y.d)(),G=Object(y.d)(),K=Object(y.d)(),M=Object(y.d)(),Q=Object(y.d)(),T=Object(y.d)(),U=Object(y.d)(),V=Object(y.d)(),X=Object(y.d)(),Y=Object(y.d)(),Z=Object(y.e)(null),_=Object(y.d)(),ee=Object(y.e)(null).on(_,(function(e,t){return t.id}));Object(y.f)({from:_.map((function(){return"remove-person"})),to:V});var te=Object(y.g)({source:Object(y.k)({clock:X,source:Object(y.b)(ee,Z,(function(e,t){return{id:e,owner:t}}))}),filter:function(e){return"remove-person"===e.owner},target:q.prepend((function(e){return{id:e.id}}))});function ne(){return r.a.createElement("section",null,Object(O.c)(W,(function(e){var t=e.fullName,n=e.id;return r.a.createElement(x.a,null,r.a.createElement(o.b,{to:"/pavlo-gleck/person-info/".concat(n)},r.a.createElement(F.b,null,t)),r.a.createElement(v.a,{kind:"tertiary",onClick:function(){return _({id:n})}},r.a.createElement(A.a,{size:"scale800"})))})))}Object(y.f)({from:te.map((function(){return null})),to:Z});var ae=n(108),re=n(21),ce=n(36),le=n(100),oe=n(106),ie=Object(y.d)(),ue=Object(y.d)(),de=Object(y.d)(),se=Object(y.d)(),be=Object(y.d)(),me=Object(y.e)(!1).on([N,I],(function(){return!0})).on(ie,(function(){return!1})).reset([ue,de]),fe=Object(y.e)("").on(se,(function(e,t){return t})),Oe=Object(y.e)("").on(be,(function(e,t){return t})),je=Object(y.e)(null).on(N,(function(){return"category"})).on(I,(function(){return"person"}));function ge(){var e=Object(O.d)(me),t=Object(O.d)(fe),n=Object(O.d)(Oe),a=Object(O.d)(je);return r.a.createElement(ae.a,{isOpen:e,onClose:ie,animate:!0,autoFocus:!0,size:re.c.default,role:re.b.dialog},r.a.createElement(ce.g,null,"category"===a?"New category":"New person"),r.a.createElement(ce.e,null,r.a.createElement(oe.a,{label:"category"===a?"Category name":"Full name"},r.a.createElement(E.a,{id:"category"===a?"category-name":"full-name",value:"category"===a?n:t,onChange:function(e){return"category"===a?be(e.target.value):se(e.target.value)}}))),r.a.createElement(ce.f,null,r.a.createElement(le.a,{onClick:"category"===a?de:ue},"Add")))}Object(y.k)({clock:ue,source:fe,fn:function(e){return{fullName:e,id:Date.now()}},target:H}),Object(y.k)({clock:de,source:Oe,fn:function(e){return{name:e,id:Date.now()}},target:G}),fe.reset([ie,H]),Oe.reset([ie,G]);var pe=n(105),ve=Object(O.a)("person-info"),Ee=Object(y.d)(),ke=Object(y.d)(),he=Object(y.b)(ve.state,J,(function(e,t){var n,a=e.id;return null===(n=t.find((function(e){return String(e.id)===String(a)})))||void 0===n?void 0:n.fullName})),ye=Object(y.b)(R,L,ve.state,(function(e,t,n){var a=n.id;if(!a)return[];var r=e[a];return t.map((function(e){return{id:e.id,name:e.name,value:r[e.id]||null}}))}));function we(){var e=Object(i.g)().id;Object(O.b)(ve,{id:e});var t=Object(O.d)(he);return r.a.createElement(m.a,{margin:"scale500"},r.a.createElement(oe.a,{label:"Full name"},r.a.createElement(E.a,{id:e,value:t,onChange:ke})),Object(O.c)(ye,(function(e){var t=e.id,n=e.name,a=e.value;return r.a.createElement(r.a.Fragment,null,r.a.createElement(oe.a,{label:n},r.a.createElement(pe.a,{id:n,value:a,onChange:function(e){return Ee({id:t,value:e.target.value})}})))})))}Object(y.k)({source:ve.state,clock:ke,fn:function(e,t){return{id:Number(e.id),value:t.target.value}},target:Q}),Object(y.k)({source:ve.state,clock:Ee,fn:function(e,t){var n=t.id,a=t.value;return{personId:e.id,info:{categoryId:n,value:a}}},target:T});var Ce=Object(y.e)(!1).on(V,(function(){return!0})).reset([Y,X,U]);function Ie(){var e=Object(O.d)(Ce);return r.a.createElement(ae.a,{isOpen:e,onClose:U,animate:!0,autoFocus:!0,size:re.c.default,role:re.b.dialog},r.a.createElement(ce.g,null,"Confirm?"),r.a.createElement(ce.f,null,r.a.createElement(le.a,{kind:"tertiary",onClick:Y},"Cancel"),r.a.createElement(le.a,{onClick:X},"Okay")))}Z.on(V,(function(e,t){return t})).reset([Y,U]),Z.watch(console.log);var Ne=n(24),ze=n(49),xe=n(101);function Ae(){var e=Object(O.d)(L).map((function(e,t){return r.a.createElement(ze.b,{draggableId:String(e.id),index:t,key:e.id},(function(t,n){return r.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:Object(Ne.a)({border:"".concat(n.isDragging?"2px solid black":"none")},t.draggableProps.style)}),r.a.createElement(x.a,null,r.a.createElement(xe.a,{size:"scale1200"}),r.a.createElement(E.a,{value:e.name,onChange:function(t){return K({id:e.id,value:t.target.value})}})))}))}));return r.a.createElement(ze.a,{onDragEnd:function(e){return M({source:e.source.index,dest:e.destination.index})}},r.a.createElement(m.a,{margin:"scale500"},r.a.createElement(F.a,null,"Edit categories")),r.a.createElement(ze.c,{droppableId:"pohuy"},(function(t){return r.a.createElement("div",Object.assign({ref:t.innerRef},t.droppableProps),e,t.placeholder)})))}var Fe=new u.a;function Se(){return r.a.createElement(d.a,{value:Fe},r.a.createElement(s.a,{theme:b.a},r.a.createElement(o.a,null,r.a.createElement(m.a,null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/pavlo-gleck",exact:!0},r.a.createElement(m.a,{margin:"scale500"},r.a.createElement(z,null)),r.a.createElement(ne,null)),r.a.createElement(i.a,{path:"/pavlo-gleck/person-info/:id"},r.a.createElement(we,null)),r.a.createElement(i.a,{path:"/pavlo-gleck/edit-categories"},r.a.createElement(Ae,null))),r.a.createElement(ge,null),r.a.createElement(Ie,null)))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var De=n(26),Pe=n(20);J.on(H,(function(e,t){return[].concat(Object(Pe.a)(e),[t])})).on(q,(function(e,t){var n=t.id;return e.filter((function(e){return e.id!==n}))})).on(Q,(function(e,t){var n=t.value,a=t.id;return e.map((function(e){return e.id===a?Object(Ne.a)({},e,{fullName:n}):e}))})),L.on(G,(function(e,t){return[].concat(Object(Pe.a)(e),[t])})).on(M,(function(e,t){var n=t.source,a=t.dest,r=Object(Pe.a)(e),c=r.splice(n,1),l=Object(f.a)(c,1)[0];return r.splice(a,0,l),r})).on(K,(function(e,t){var n=t.id,a=t.value;return e.map((function(e){return e.id===n?Object(Ne.a)({},e,{name:a}):e}))})),R.on(T,(function(e,t){var n=t.personId,a=t.info;return Object(Ne.a)({},e,Object(De.a)({},n,Object(Ne.a)({},e[n],Object(De.a)({},a.categoryId,a.value))))})).on(H,(function(e,t){var n=t.id;return Object(Ne.a)({},e,Object(De.a)({},n,{}))})).on(q,(function(e,t){var n=t.id,a=Object(Ne.a)({},e);return delete a[n],a}));n(86);l.a.render(r.a.createElement(Se,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[75,1,2]]]);
//# sourceMappingURL=main.4af9db57.chunk.js.map