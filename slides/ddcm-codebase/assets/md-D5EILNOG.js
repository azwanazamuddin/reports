import{_ as i}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-B-hyl32v.js";import{o as p,b as u,w as n,g as s,ah as e,d,m as c,v as m,x as _,T as t}from"./modules/vue-HkVYbCdo.js";import{I as h}from"./default-BTUcr6C7.js";import{K as g,a6 as f}from"./index-ZFm5vXLR.js";import"./modules/unplugin-icons-BJruVcbD.js";import"./ScholarlyHeader.vue_vue_type_script_setup_true_lang-48nELSZO.js";import"./useFontSizeStyles-DYqBgcfE.js";import"./slidev/SlideWrapper-l4zEOE5D.js";import"./modules/shiki-DJhcuA_4.js";const S={__name:"slides.md__slidev_30",setup(k){const{$clicksContext:l,$frontmatter:o}=g();return l.setup(),(b,a)=>{const r=i;return p(),u(h,m(_(t(f)(t(o),29))),{default:n(()=>[a[1]||(a[1]=s("h1",null,"CSR Graph Construction",-1)),a[2]||(a[2]=s("blockquote",null,[s("p",null,"estimation/graph_builder.py → GraphBuilder._build_csr()")],-1)),a[3]||(a[3]=s("p",null,[s("strong",null,"Input:"),e(),s("code",null,"(N, 6)"),e(" states tensor + "),s("code",null,"EdgeSpiller"),e(" (disk-backed edge data)")],-1)),d(r,c({},{title:"",ranges:[]}),{default:n(()=>[...a[0]||(a[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"1. Time-bucket map:   state_time_offsets = {t → (start, end)} from batch_sizes")]),e(`
`),s("span",{class:"line"},[s("span")]),e(`
`),s("span",{class:"line"},[s("span",null,"2. Hash table:        pack all N states into 39-bit hashes")]),e(`
`),s("span",{class:"line"},[s("span",null,"                      → sort → (sorted_hashes, sort_order)")]),e(`
`),s("span",{class:"line"},[s("span")]),e(`
`),s("span",{class:"line"},[s("span",null,"3. Target resolution  (per time-step bucket):")]),e(`
`),s("span",{class:"line"},[s("span",null,"   source_global  = edge[:, 0] + state_time_offsets[t].start")]),e(`
`),s("span",{class:"line"},[s("span",null,"   query_hashes   = hash(next_states_raw)       (same 39-bit formula)")]),e(`
`),s("span",{class:"line"},[s("span",null,"   positions      = torch.searchsorted(sorted_hashes, query_hashes)")]),e(`
`),s("span",{class:"line"},[s("span",null,"   found_mask     = sorted_hashes[positions] == query_hashes")]),e(`
`),s("span",{class:"line"},[s("span",null,"   target_global  = sort_order[positions[found_mask]]")]),e(`
`),s("span",{class:"line"},[s("span")]),e(`
`),s("span",{class:"line"},[s("span",null,"4. Concatenate:       buckets are time-ordered; already globally sorted")]),e(`
`),s("span",{class:"line"},[s("span",null,"                      → no global argsort (would exceed MPS INT_MAX at 1.6B edges)")]),e(`
`),s("span",{class:"line"},[s("span")]),e(`
`),s("span",{class:"line"},[s("span",null,"5. CSR:               edge_counts = torch.bincount(sources, minlength=N)  [on CPU]")]),e(`
`),s("span",{class:"line"},[s("span",null,"                      row_ptr[1:] = edge_counts.cumsum(0)")])])],-1)])]),_:1},16)]),_:1},16)}}};export{S as default};
