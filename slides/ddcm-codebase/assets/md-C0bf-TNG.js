import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-B-hyl32v.js";import{o as r,b as c,w as e,g as s,d,m as u,ah as n,v as _,x as m,T as l}from"./modules/vue-HkVYbCdo.js";import{I as g}from"./default-BTUcr6C7.js";import{K as f,a6 as h}from"./index-ZFm5vXLR.js";import"./modules/unplugin-icons-BJruVcbD.js";import"./ScholarlyHeader.vue_vue_type_script_setup_true_lang-48nELSZO.js";import"./useFontSizeStyles-DYqBgcfE.js";import"./slidev/SlideWrapper-l4zEOE5D.js";import"./modules/shiki-DJhcuA_4.js";const V={__name:"slides.md__slidev_25",setup(k){const{$clicksContext:t,$frontmatter:i}=f();return t.setup(),(y,a)=>{const p=o;return r(),c(g,_(m(l(h)(l(i),24))),{default:e(()=>[a[1]||(a[1]=s("h1",null,"Pipeline — Phase 1A: Forward Pass BFS",-1)),d(p,u({},{title:"",ranges:["8-11"]}),{default:e(()=>[...a[0]||(a[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"estimate.py")]),n(`
`),s("span",{class:"line"},[s("span",null,"  └─ estimation/run_tensor_estimation.py :: main()")]),n(`
`),s("span",{class:"line"},[s("span",null,"       ├─ estimation/data_loader.py :: load_dataset()          ← Data")]),n(`
`),s("span",{class:"line"},[s("span",null,"       ├─ core/state_encoder.py :: StateEncoder                ← States")]),n(`
`),s("span",{class:"line"},[s("span",null,"       ├─ Group persons by topology key (act_types, car_owned)")]),n(`
`),s("span",{class:"line"},[s("span",null,"       └─ _run_nfxp_estimation()")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │")]),n(`
`),s("span",{class:"line"},[s("span",null,"            ├─ Phase 1A — build graph topology  [once; θ-independent; cached to disk]")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │    estimation/graph_builder.py :: build_graph()")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │      planning/forward_pass_tensor.py :: TensorForwardPass  (BFS)")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │      planning/graph_builder_tensor.py :: GraphBuilder       (CSR)")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │")]),n(`
`),s("span",{class:"line"},[s("span",null,"            ├─ Phase 1B — encode observed paths + initial V̄(θ₀)  [once at θ₀]")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │    estimation/nfxp_estimator.py :: encode_observed_steps()")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │    estimation/nfxp_estimator.py :: run_bi_for_group()")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │      planning/backward_induction_tensor.py :: BackwardInduction")]),n(`
`),s("span",{class:"line"},[s("span",null,"            │")]),n(`
`),s("span",{class:"line"},[s("span",null,"            └─ Phase 2 — NFXP optimizer loop  [every BFGS iteration]")]),n(`
`),s("span",{class:"line"},[s("span",null,"                 neg_loglik(θ):  set_params → recompute utilities → BI → compute_exact_ll")]),n(`
`),s("span",{class:"line"},[s("span",null,"                 grad(θ):        same + planning/gv_backward_tensor.py :: GVBackward")])])],-1)])]),_:1},16)]),_:1},16)}}};export{V as default};
