import{B as e,C as t,O as n,Q as r,_t as i,v as a,w as o,y as s,yt as c}from"./modules/shiki-5lP-1OJ1.js";import{H as l,V as u}from"./useNav-rxqVRdK2.js";import{t as d}from"./slidev/CodeBlockWrapper-BCpfmUff.js";import{t as f}from"./default-CJKhsMWf.js";var p={__name:`slides.md__slidev_66`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=l();return g.setup(),(l,p)=>{let m=d;return e(),s(f,c(n(i(u)(i(b),65))),{default:r(()=>[p[2]||=a(`h1`,null,`Fused Utilities — Intuition`,-1),p[3]||=a(`p`,null,[t(`Think of utilities as a `),a(`strong`,null,`conveyor belt`),t(`, not a warehouse.`)],-1),p[4]||=a(`p`,null,[a(`strong`,null,`Old path:`),t(` fill a 19 GB warehouse (one global write), then make 96 + 96 trips to the warehouse to fetch what you need.`)],-1),o(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[a(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[a(`code`,{class:`language-text`},[a(`span`,{class:`line`},[a(`span`,null,`BFGS iter k`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`├─ recompute_graph_utilities()   ← fill the warehouse: 4.76B floats × 4 bytes = 19 GB`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`├─ BI:    t=96 … t=1   each reads utils[slice] from RAM, computes V`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│                        96 warehouse trips`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`└─ GV:   chunk 0 … N   each reads utils[slice] from RAM, computes ∂V/∂θ`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                         ~96 more warehouse trips`)])])],-1)]]),_:1}),p[5]||=a(`p`,null,[a(`strong`,null,`New path:`),t(` compute utilities `),a(`strong`,null,`on-demand`),t(`, consume immediately, discard.`)],-1),o(m,{title:``,ranges:[]},{default:r(()=>[...p[1]||=[a(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[a(`code`,{class:`language-text`},[a(`span`,{class:`line`},[a(`span`,null,`BFGS iter k`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`├─ BI:    t=96 … t=1`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│         ├─ utils_t = compute_batch(states_t, acts_t)   ← tiny slice, ~50M edges`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│         ├─ fused_bi_step(utils_t, targets_t, V)        ← consumed in Metal`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│         └─ utils_t freed                               ← ~200 MB peak, not 19 GB`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`│`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`└─ GV:   chunk 0 … N`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`          ├─ utils_c = compute_batch(states_c, acts_c)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`          └─ utils_c freed after gradient scatter`)])])],-1)]]),_:1}),p[6]||=a(`p`,null,`The 19 GB array never exists. Memory bound becomes per-timestep (~200 MB), not per-graph.`,-1)]),_:1},16)}}};export{p as default};