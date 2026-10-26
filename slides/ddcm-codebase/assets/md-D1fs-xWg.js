import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-B4m7DOMt.js";import{o as r,Y as c,aa as e,b as n,a9 as u,aA as _,ab as a,aC as d,aD as m,G as l}from"./modules/vue-CQDW7uO4.js";import{I as g}from"./default-BwQys07c.js";import{K as h,a6 as y}from"./index-C5VTuUwJ.js";import"./modules/unplugin-icons-Dmgetque.js";import"./ScholarlyHeader.vue_vue_type_script_setup_true_lang-B99esPMz.js";import"./useFontSizeStyles-Bu6DRE4f.js";import"./modules/shiki-KldqaUeW.js";const I={__name:"slides.md__slidev_71",setup(f){const{$clicksContext:i,$frontmatter:t}=h();return i.setup(),(b,s)=>{const p=o;return r(),c(g,d(m(l(y)(l(t),70))),{default:e(()=>[s[1]||(s[1]=n("h1",null,"Pipeline — Simulation",-1)),u(p,_({},{title:"",ranges:["22-26"]}),{default:e(()=>[...s[0]||(s[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"estimate.py")]),a(`
`),n("span",{class:"line"},[n("span",null,"  └─ estimation/run_tensor_estimation.py :: main()")]),a(`
`),n("span",{class:"line"},[n("span",null,"       ├─ estimation/data_loader.py :: load_dataset()          ← Data")]),a(`
`),n("span",{class:"line"},[n("span",null,"       ├─ core/state_encoder.py :: StateEncoder                ← States")]),a(`
`),n("span",{class:"line"},[n("span",null,"       ├─ Group persons by topology key (act_types, car_owned)")]),a(`
`),n("span",{class:"line"},[n("span",null,"       └─ _run_nfxp_estimation()")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │")]),a(`
`),n("span",{class:"line"},[n("span",null,"            ├─ Phase 1A — build graph topology  [once; θ-independent; cached to disk]")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/graph_builder.py :: build_graph()")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/forward_pass_tensor.py :: TensorForwardPass  (BFS)")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/graph_builder_tensor.py :: GraphBuilder       (CSR)")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │")]),a(`
`),n("span",{class:"line"},[n("span",null,"            ├─ Phase 1B — encode observed paths + initial V̄(θ₀)  [once at θ₀]")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/nfxp_estimator.py :: encode_observed_steps()")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │    estimation/nfxp_estimator.py :: run_bi_for_group()")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │      planning/backward_induction_tensor.py :: BackwardInduction")]),a(`
`),n("span",{class:"line"},[n("span",null,"            │")]),a(`
`),n("span",{class:"line"},[n("span",null,"            └─ Phase 2 — NFXP optimizer loop  [every BFGS iteration]")]),a(`
`),n("span",{class:"line"},[n("span",null,"                 neg_loglik(θ):  set_params → recompute utilities → BI → compute_exact_ll")]),a(`
`),n("span",{class:"line"},[n("span",null,"                 grad(θ):        same + planning/gv_backward_tensor.py :: GVBackward")]),a(`
`),n("span",{class:"line"},[n("span")]),a(`
`),n("span",{class:"line"},[n("span",null,"simulate.py")]),a(`
`),n("span",{class:"line"},[n("span",null,"  └─ estimation/run_behavioral_simulation.py :: main()")]),a(`
`),n("span",{class:"line"},[n("span",null,"       ├─ estimation/graph_builder.py :: build_graph()   ← same graph, same BI")]),a(`
`),n("span",{class:"line"},[n("span",null,"       │    planning/backward_induction_tensor.py :: BackwardInduction")]),a(`
`),n("span",{class:"line"},[n("span",null,"       └─ estimation/run_behavioral_simulation.py :: simulate_group()")]),a(`
`),n("span",{class:"line"},[n("span",null,"            planning/simulate_batch_tensor.py :: simulate_batch_tensor()")])])],-1)])]),_:1},16)]),_:1},16)}}};export{I as default};
