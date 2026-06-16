import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-B-hyl32v.js";import{o as r,b as c,w as e,g as n,d as u,m as _,ah as s,v as d,x as m,T as l}from"./modules/vue-HkVYbCdo.js";import{I as g}from"./default-BTUcr6C7.js";import{K as h,a6 as y}from"./index-ZFm5vXLR.js";import"./modules/unplugin-icons-BJruVcbD.js";import"./ScholarlyHeader.vue_vue_type_script_setup_true_lang-48nELSZO.js";import"./useFontSizeStyles-DYqBgcfE.js";import"./slidev/SlideWrapper-l4zEOE5D.js";import"./modules/shiki-DJhcuA_4.js";const V={__name:"slides.md__slidev_70",setup(f){const{$clicksContext:i,$frontmatter:t}=h();return i.setup(),(k,a)=>{const p=o;return r(),c(g,d(m(l(y)(l(t),69))),{default:e(()=>[a[1]||(a[1]=n("h1",null,"Pipeline — Simulation",-1)),u(p,_({},{title:"",ranges:["22-26"]}),{default:e(()=>[...a[0]||(a[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"estimate.py")]),s(`
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
`),n("span",{class:"line"},[n("span",null,"                 grad(θ):        same + planning/gv_backward_tensor.py :: GVBackward")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"simulate.py")]),s(`
`),n("span",{class:"line"},[n("span",null,"  └─ estimation/run_behavioral_simulation.py :: main()")]),s(`
`),n("span",{class:"line"},[n("span",null,"       ├─ estimation/graph_builder.py :: build_graph()   ← same graph, same BI")]),s(`
`),n("span",{class:"line"},[n("span",null,"       │    planning/backward_induction_tensor.py :: BackwardInduction")]),s(`
`),n("span",{class:"line"},[n("span",null,"       └─ estimation/run_behavioral_simulation.py :: simulate_group()")]),s(`
`),n("span",{class:"line"},[n("span",null,"            planning/simulate_batch_tensor.py :: simulate_batch_tensor()")])])],-1)])]),_:1},16)]),_:1},16)}}};export{V as default};
