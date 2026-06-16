import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-f6v-SkBO.js";import{o as r,b as c,w as e,g as n,d,m as u,ah as s,v as _,x as m,T as l}from"./modules/vue-DNE6RBtY.js";import{I as g}from"./default-DEpHQMCj.js";import{K as f,a6 as h}from"./index-CXyOw_He.js";import"./modules/unplugin-icons-CcoQ5i3g.js";import"./ScholarlyHeader.vue_vue_type_script_setup_true_lang-CLlSPJpl.js";import"./useFontSizeStyles-zpZNqKov.js";import"./slidev/SlideWrapper-mpk2yixE.js";import"./modules/shiki-BusmDsX4.js";const N={__name:"slides.md__slidev_44",setup(k){const{$clicksContext:t,$frontmatter:i}=f();return t.setup(),(y,a)=>{const p=o;return r(),c(g,_(m(l(h)(l(i),43))),{default:e(()=>[a[1]||(a[1]=n("h1",null,"Pipeline — Phase 2: NFXP Loop",-1)),d(p,u({},{title:"",ranges:["18-19"]}),{default:e(()=>[...a[0]||(a[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"estimate.py")]),s(`
`),n("span",{class:"line"},[n("span",null,"  └─ estimation/run_tensor_estimation.py :: main()")]),s(`
`),n("span",{class:"line"},[n("span",null,"       ├─ estimation/data_loader.py :: load_dataset()          ← Data")]),s(`
`),n("span",{class:"line"},[n("span",null,"       ├─ core/state_encoder.py :: StateEncoder                ← States")]),s(`
`),n("span",{class:"line"},[n("span",null,"       ├─ Group persons by topology key (act_types, car_owned)")]),s(`
`),n("span",{class:"line"},[n("span",null,"       └─ _run_nfxp_estimation()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ├─ Phase 1A — build graph topology  [once; θ-independent; cached to disk]")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/graph_builder.py :: build_graph()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/forward_pass_tensor.py :: TensorForwardPass  (BFS)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/graph_builder_tensor.py :: GraphBuilder       (CSR)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ├─ Phase 1B — encode observed paths + initial V̄(θ₀)  [once at θ₀]")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/nfxp_estimator.py :: encode_observed_steps()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/nfxp_estimator.py :: run_bi_for_group()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/backward_induction_tensor.py :: BackwardInduction")]),s(`
`),n("span",{class:"line"},[n("span",null,"            │")]),s(`
`),n("span",{class:"line"},[n("span",null,"            └─ Phase 2 — NFXP optimizer loop  [every BFGS iteration]")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 neg_loglik(θ):  set_params → recompute utilities → BI → compute_exact_ll")]),s(`
`),n("span",{class:"line"},[n("span",null,"                 grad(θ):        same + planning/gv_backward_tensor.py :: GVBackward")])])],-1)])]),_:1},16)]),_:1},16)}}};export{N as default};
