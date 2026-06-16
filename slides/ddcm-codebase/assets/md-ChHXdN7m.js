import{B as e,C as t,O as n,Q as r,_t as i,v as a,w as o,y as s,yt as c}from"./modules/shiki-5lP-1OJ1.js";import{H as l,V as u}from"./useNav-rxqVRdK2.js";import{t as d}from"./slidev/CodeBlockWrapper-BCpfmUff.js";import{t as f}from"./default-CJKhsMWf.js";var p={__name:`slides.md__slidev_30`,setup(p){let{$slidev:m,$nav:h,$clicksContext:g,$clicks:_,$page:v,$renderContext:y,$frontmatter:b}=l();return g.setup(),(l,p)=>{let m=d;return e(),s(f,c(n(i(u)(i(b),29))),{default:r(()=>[p[1]||=a(`h1`,null,`CSR Graph Construction`,-1),p[2]||=a(`blockquote`,null,[a(`p`,null,`estimation/graph_builder.py → GraphBuilder._build_csr()`)],-1),p[3]||=a(`p`,null,[a(`strong`,null,`Input:`),t(),a(`code`,null,`(N, 6)`),t(` states tensor + `),a(`code`,null,`EdgeSpiller`),t(` (disk-backed edge data)`)],-1),o(m,{title:``,ranges:[]},{default:r(()=>[...p[0]||=[a(`pre`,{class:`shiki shiki-themes vitesse-dark vitesse-light slidev-code`,style:{"--shiki-dark":`#dbd7caee`,"--shiki-light":`#393a34`,"--shiki-dark-bg":`#121212`,"--shiki-light-bg":`#ffffff`}},[a(`code`,{class:`language-text`},[a(`span`,{class:`line`},[a(`span`,null,`1. Time-bucket map:   state_time_offsets = {t → (start, end)} from batch_sizes`)]),t(`
`),a(`span`,{class:`line`},[a(`span`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`2. Hash table:        pack all N states into 39-bit hashes`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                      → sort → (sorted_hashes, sort_order)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`3. Target resolution  (per time-step bucket):`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`   source_global  = edge[:, 0] + state_time_offsets[t].start`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`   query_hashes   = hash(next_states_raw)       (same 39-bit formula)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`   positions      = torch.searchsorted(sorted_hashes, query_hashes)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`   found_mask     = sorted_hashes[positions] == query_hashes`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`   target_global  = sort_order[positions[found_mask]]`)]),t(`
`),a(`span`,{class:`line`},[a(`span`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`4. Concatenate:       buckets are time-ordered; already globally sorted`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                      → no global argsort (would exceed MPS INT_MAX at 1.6B edges)`)]),t(`
`),a(`span`,{class:`line`},[a(`span`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`5. CSR:               edge_counts = torch.bincount(sources, minlength=N)  [on CPU]`)]),t(`
`),a(`span`,{class:`line`},[a(`span`,null,`                      row_ptr[1:] = edge_counts.cumsum(0)`)])])],-1)]]),_:1})]),_:1},16)}}};export{p as default};