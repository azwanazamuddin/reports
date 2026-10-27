import{d as z,o as y,a as C,r as B,Y as E,a5 as A,b as g,a4 as I,aA as P,aB as S,G as m}from"./modules/vue-Ck5nFOQZ.js";import{K as f,al as T}from"./index-_5xUMv4u.js";import{u as K,C as e}from"./rough-scene-Y2pZn5Xe.js";import{I as L}from"./slidev/default-BEAW2cyz.js";import"./modules/shiki-Dy8GSOtY.js";const a=50,$=58,j=z({__name:"ConstraintKinds",setup(w){f();const s=B(),i=[[`Institutional
the same for everyone`,"nothing about the person",`opening hours,
the network`,"removed once, for everyone",e.green],[`Capability: means
what a person holds`,"an attribute with few values",`car available,
which modes are usable`,"one graph per type",e.green],[`Capability: budget
an amount used up in the day`,`the amount used so far,
against the person's bound`,`time or money for the day,
a cap on trips`,"a different start node",e.green],[`Anchor
where and when one must be`,`an attribute nearly unique
to the person`,`workplace and work hours,
home by the end of the day`,"a mask on the shared graph",e.green],[`Interdependent
set by another person`,"another person's day",`partners sharing one car,
who collects the child`,"does not reduce: joint state",e.red]];return K(s,t=>{const o=t.layer(0);t.text(o,10,14,"kind",{size:13.5,weight:700,color:e.grey}),t.text(o,262,14,"the rule reads",{size:13.5,weight:700,color:e.grey}),t.text(o,450,14,"for example",{size:13.5,weight:700,color:e.grey}),t.text(o,690,14,"what the model does",{size:13.5,weight:700,color:e.grey}),i.forEach(([x,_,b,k,v],h)=>{const r=28+h*$,n=t.layer(h+1),p=h===i.length-1;t.box(n,10,r,236,a,x,{fill:p?e.greyLight:e.secondaryLight,fillStyle:"hachure",hachureGap:8,stroke:p?e.red:e.secondary,strokeWidth:1.8},{color:e.deep,size:13.5});const u=_.split(`
`);u.forEach((c,d)=>t.text(n,262,r+a/2+(d-(u.length-1)/2)*17,c,{size:13.5,color:e.grey,italic:!0})),b.split(`
`).forEach((c,d)=>t.text(n,450,r+17+d*17,c,{size:13.5,color:e.ink})),t.arrow(n,652,r+a/2,682,r+a/2,{strokeWidth:1.8,stroke:e.grey},8),t.text(n,690,r+a/2,k,{size:13.5,weight:700,color:v})});const l=t.layer(6);t.text(l,450,328,"Four kinds, capability in two forms. All but the last keep every person exact on shared graphs.",{anchor:"middle",size:14.5,weight:700,color:e.deep}),t.text(l,450,348,"A second axis: a rule that reads the path so far is made Markovian by extending the state (Tran, Mai and Hoang 2025).",{anchor:"middle",size:13,color:e.grey})}),(t,o)=>(y(),C("svg",{ref_key:"svg",ref:s,viewBox:"0 0 900 360",class:"w-full"},null,512))}}),V={__name:"slides.md__slidev_19",setup(w){const{$clicksContext:s,$frontmatter:i}=f();return s.setup(),(t,o)=>{const l=j;return y(),E(L,P(S(m(T)(m(i),18))),{default:A(()=>[o[0]||(o[0]=g("h1",null,"Types of constraints",-1)),o[1]||(o[1]=g("p",null,"Our proposed classification, sorted by what the rule reads",-1)),I(l)]),_:1},16)}}};export{V as default};
