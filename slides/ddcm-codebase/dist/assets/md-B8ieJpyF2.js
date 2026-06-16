import{B as e,C as t,O as n,Q as r,_t as i,v as a,w as o,y as s,yt as c}from"./modules/shiki-5lP-1OJ1.js";import{H as l,V as u}from"./useNav-rxqVRdK2.js";import{t as d}from"./slidev/CodeBlockWrapper-BCpfmUff.js";import{t as f}from"./default-CJKhsMWf.js";var p={__name:`slides.md__slidev_44`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=l();return g.setup(),(l,p)=>{let m=d;return e(),s(f,c(n(i(u)(i(b),43))),{default:r(()=>[p[1]||=a(`h1`,null,`Pipeline — Phase 2: NFXP Loop`,-1),o(m,{title:``,ranges:[`18-19`]},{default:r(()=>[...p[0]||=[a(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[a(`code`,{class:`language-text`},[a(`span`,{class:`line`},[a(`span`,null,`estimate.py`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`  └─ estimation/run_tensor_estimation.py :: main()`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`       ├─ estimation/data_loader.py :: load_dataset()          ← Data`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`       ├─ core/state_encoder.py :: StateEncoder                ← States`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`       ├─ Group persons by topology key (act_types, car_owned)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`       └─ _run_nfxp_estimation()`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            ├─ Phase 1A — build graph topology  [once; θ-independent; cached to disk]`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │    estimation/graph_builder.py :: build_graph()`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │      planning/forward_pass_tensor.py :: TensorForwardPass  (BFS)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │      planning/graph_builder_tensor.py :: GraphBuilder       (CSR)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            ├─ Phase 1B — encode observed paths + initial V̄(θ₀)  [once at θ₀]`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │    estimation/nfxp_estimator.py :: encode_observed_steps()`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │    estimation/nfxp_estimator.py :: run_bi_for_group()`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │      planning/backward_induction_tensor.py :: BackwardInduction`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            │`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`            └─ Phase 2 — NFXP optimizer loop  [every BFGS iteration]`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                 neg_loglik(θ):  set_params → recompute utilities → BI → compute_exact_ll`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                 grad(θ):        same + planning/gv_backward_tensor.py :: GVBackward`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};