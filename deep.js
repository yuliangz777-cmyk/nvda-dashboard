/* Research edition 3. Reviewed 2026-09-24. No brokerage access or live signals. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const src = {
 q:'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/default.aspx',
 annual:'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/',
 blackwell:'https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/',
 inference:'https://developer.nvidia.com/blog/?p=73739',
 dynamo:'https://docs.nvidia.com/dynamo/dev/knowledge-base/concepts/system-architecture/disaggregated-serving',
 ts:'https://investor.tsmc.com/english/quarterly-results/2026/q2',
 dsx:'https://blogs.nvidia.com/blog/dsx-ready-ai-factories-power-cooling/',
 ml:'https://blogs.nvidia.com/blog/vera-rubin-nvl72-mlperf-inference/',
 robot:'https://blogs.nvidia.com/blog/isaac-ros-5-0-agentic-open-source-robotics/',
 atr:'https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/atr',
 rsi:'https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/RSI'
};
const a = (key,label) => `<a href="${src[key]}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const table = (heads,rows) => `<div class="table-wrap"><table><thead><tr>${heads.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const detail = (title,body) => `<details><summary>${title}</summary>${body}</details>`;
const block = (title,body) => `<div class="deep-block"><h3>${title}</h3>${body}</div>`;
const append = (selector,html) => document.querySelector(selector).insertAdjacentHTML('beforeend',`<div class="research depth">${html}</div>`);
const input = (id,label,value,min=0,max='')=>`<label for="${id}">${label}<input id="${id}" type="number" step="any" min="${min}" ${max!==''?`max="${max}"`:''} value="${value}" required></label>`;
const num = id => Number($(id).value);
const valid = ids => ids.every(id=>$(id).value.trim()!=='' && Number.isFinite(num(id)) && $(id).checkValidity());
const money = v => v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

// Keep annual history distinct from the latest verified quarterly snapshot.
document.querySelector('.ticker-strip').innerHTML = `<div><span>Q2 FY27 REVENUE · USD</span><strong>$96.221B</strong><em>+106% YoY</em></div><div><span>Q2 FY27 DATA CENTER · USD</span><strong>$89.0B</strong><em>+117% YoY</em></div><div><span>Q2 FY27 GAAP GROSS MARGIN</span><strong>75.0%</strong><em>實績</em></div><div><span>Q3 FY27 REVENUE GUIDANCE</span><strong>$108B</strong><em>±2% · 預測</em></div>`;
$('asOf').textContent='深讀版 3 · 2026-09-24';
document.querySelector('#learn .notice').innerHTML=`<strong>研究核對：2026-09-24｜非自動更新</strong><br>最新核對財報為 Q2 FY2027（截至 2026-07-26；2026-08-26 公布），年度圖仍保留 FY2022–FY2026 歷史。首頁 Q3 數字是管理層指引。行情時間依圖表；以下試算全部是教學假設。${a('q','季度原文')}`;
document.querySelector('#financials .notice').innerHTML=`<strong>比較期間先對齊</strong><br>上方年度圖與卡片為 FY2026 歷史；下方補入 Q2 FY2027 單季資料。年度毛利率與單季毛利率不要直接當成季增減。${a('annual','FY2026 原文')} · ${a('q','Q2 FY2027 原文')}`;
document.querySelector('.product-section').id='products';
document.querySelector('.product-section .section-heading > p').textContent='五類是研究用產品地圖，不是五個可相加的財報分部。點選後閱讀需求、收入路徑與失效條件。';

append('#learn',block('一筆 AI 訂單，要走完哪些步驟？',table(['階段','白話意思','此時能下什麼結論？'],[
 ['需求與預算','客戶預估服務需求，決定自建或租用、安排融資。','需求意向不是不可取消訂單；預算也可能跨多年。'],
 ['設計與採購','決定平台、記憶體、網路與機房配置，預留交付。','設計採用增加機會，但不保證足額採購。'],
 ['生產與組裝','晶圓、封裝、HBM、機櫃和測試共同完成。','某個零件出貨不代表整個系統已完成。'],
 ['交付與認列','依合約判斷控制權移轉與收入認列。','認列時點依交易條件；不能一律等同客戶通電。'],
 ['部署與變現','客戶上線、提供算力服務並收款。','使用效率與回報決定再採購；和 NVIDIA 當季收入存在時間差。']]))+
 detail('GPU 效能很高，為什麼還可能不划算？',`<p>想像買一台昂貴咖啡機：每分鐘能做幾杯只是規格，還要看客人是否足夠、機器能否連續使用、電費和維修，以及每杯實際賣價。GPU 的利用率、記憶體、網路與排程都會改變真正的每次任務成本。</p><p><strong>教學例：</strong>兩套設備每年總成本皆為 100 萬美元，A 可完成 1,000 萬次合格任務、B 為 2,000 萬次，平均成本分別為 $0.10 與 $0.05。但若 B 的輸出品質或延遲不符需求，這個比較就無效。硬體較快不代表客戶收入必然等比例成長。</p>`)+
 detail('CUDA 的優勢，如何拆成能驗證的問題？',table(['優勢來源','可能被削弱的方式','應觀察證據'],[
 ['既有程式與函式庫','跨平台框架降低搬遷負擔','同一模型移植所需工程時間，而非只看 API 相容。'],
 ['系統整合與開發工具','競爭者改善工具與技術支援','在相同品質、延遲及規模下的總成本。'],
 ['開發者與合作夥伴','客戶有動機避免單一供應商','實際生產環境部署占比，而非試用或概念驗證。']]))+
 block('推論不是單一工作：先讀題，再逐字回答',`<div class="research-grid two"><article class="panel"><h4>Prefill｜理解輸入</h4><p>先處理提示與上下文，常偏重平行運算。長提示可能拉長第一個 token 的等待時間。觀察 TTFT（首 token 延遲）與輸入長度。</p></article><article class="panel"><h4>Decode｜產生後續內容</h4><p>逐步生成 token，低批次量時常受記憶體頻寬限制。觀察每 token 延遲、併發量與 KV cache。實際瓶頸會隨模型和批次改變。</p></article></div><p>拆開排程可各自配置資源，但增加資料傳輸及管理負擔。研究重點：軟體是否提升已購設備的產出？若有，會減少新增採購還是刺激更多需求？需要看總使用量。${a('inference','推論原理解說')} · ${a('dynamo','Dynamo 架構文件')}</p>`));

append('#financials',block('本次核對的單季數字',`<p class="muted">美元十億；EPS 為美元／稀釋股。四捨五入後可能有尾差。來源：${a('q','2026-08-26 官方財報')}</p>`+table(['項目','Q2 FY2027','讀法'],[
 ['營收','$96.221B','年增 106%、季增 18%；先區分已認列收入與未來需求。'],
 ['Data Center','$89.0B','約占營收 92.5%（由四捨五入數字計算）；高度集中於資料中心需求。'],
 ['GAAP 毛利率','75.0%','不能和 FY2026 全年 71.1% 當作連續兩季比較。'],
 ['稀釋 EPS','GAAP $2.46 / Non-GAAP $2.22','調整後不一定較高；要讀調節表。'],
 ['Q3 FY2027 指引','營收 $108B ±2%；毛利率 74.0% ±0.5 個百分點','前瞻估計，不是已實現；收入區間為 $105.84B–$110.16B。']])+`<div class="notice"><strong>口徑變更：</strong>FY2027 起 Non-GAAP 不再剔除股票薪酬，官方呈列的歷史比較數字已更新。比較舊簡報或第三方網站前要檢查是否已重編。本季新聞稿以 Data Center 與 Edge Computing 呈現業務摘要，勿把本站五類研究卡當成相同報表分類。</div>`)+
 detail('把損益表讀成一條路徑',`<p><strong>營收 − 銷售成本 = 毛利；毛利 − 營業費用 = 營業利益；加減業外與稅負 = 淨利；淨利 ÷ 稀釋股數 = EPS。</strong>某一層變好，不代表每一層都改善。投資評價收益也可能使 EPS 與本業不同步。</p><p><strong>純假設：</strong>營收 100、毛利率 75%、營業費用 10，營業利益為 65。下一期營收增至 120，毛利率降到 70%、費用升到 12，營業利益為 72：收入成長 20%，營業利益只成長約 10.8%。用這個橋接，比只看營收年增更有意義。</p>`)+
 detail('現金流與資產負債表：四組交叉檢查',table(['檢查','計算或線索','解釋限制'],[
 ['收款是否落後','DSO 約為平均應收帳款 ÷ 同期間營收 × 期間天數','季末餘額代替平均值只是近似；快速成長與交貨集中也會推升。'],
 ['庫存是否累積','DIO 約為平均存貨 ÷ 同期間銷售成本 × 期間天數','原料備料與成品滯銷意義不同；需看產品轉換及減損。'],
 ['獲利轉成多少現金','營業現金流／淨利，以及營運資金變動','單季付款時間會擾動；多季比較並閱讀附註。'],
 ['投入與承諾','預付款、採購承諾、客戶集中、投資與融資安排','資產負債表外承諾不能只靠自由現金流數字看完。']]))+
 block('估值實驗室｜假設 EPS 與本益比，價格會如何改變？',`<p>教學關係式：每股價格＝每股盈餘 × 本益比。請自行填入一致期間與口徑的 EPS；預設 $5 與 30 倍只是算例，沒有使用最新股價或分析師預測。</p><form id="valueForm"><div class="research-grid">${input('vEPS','假設年度 EPS（USD）',5,0.01)}${input('vPE','假設本益比（倍）',30,0.01)}${input('vPrice','比較價格（USD；自行填入）',150,0.01)}</div><button type="submit">更新敏感度表</button><output id="valueResult" aria-live="polite"></output><div id="valueTable"></div></form><p class="muted">橫軸：本益比 ±20%；縱軸：EPS ±20%。不是價格區間預測。EPS 為零或負數時不適用；也沒有折現、股利或資本結構模型。</p>`));

const productDeep=[
 ['Data Center｜運算、互連與軟體一起賣','客戶購買的不只有 GPU；系統配置、網路與開發工具影響每次部署的價值。收入不宜簡化成「GPU 數量 × 網路流傳單價」。',[
  ['工作負載','訓練看叢集效率、推論看延遲與單次任務成本；兩者可能使用同一批設備。'],['收入路徑','平台採用 → 系統採購 → 合約交付；設備上線和終端 AI 收款是另外兩件事。'],['追蹤','compute 與 networking 揭露、產品組合、客戶部署、毛利及庫存。'],['失效條件','客戶使用率或回報下降、採購延後，或特定工作轉向其他平台。']]],
 ['Gaming｜換機需求與通路循環','遊戲 GPU 同時服務部分創作者與本地 AI 工作。新卡規格與銷售成長之間，隔著售價、遊戲需求及通路庫存。',[
  ['需求來源','既有玩家換機、整機市場、創作需求；不能把所有玩家視為年度換機者。'],['追蹤','售價與促銷、可購得性、通路存貨；第三方市調先核對樣本。'],['誤讀','短期缺貨不必然是總需求強，也可能是首批供給少。'],['失效條件','終端銷售弱但出給通路的量增加，下一季可能消化庫存。']]],
 ['Pro Visualization｜把效能變成工作時間','專業工作站重視認證驅動、軟體相容、記憶體與維運。客戶衡量的常是工程師時間與專案完成速度。',[
  ['需求來源','設計、渲染、工程模擬與專業 AI 工作流。'],['追蹤','企業採購週期、軟體商支持與實際部署；展示專案不能當經常性收入。'],['Omniverse','可作模擬與數位分身的平台組件；合作公告不等於單獨揭露的授權營收。'],['失效條件','試驗專案未轉為生產用途，或企業削減工作站預算。']]],
 ['Automotive｜設計採用到量產需要時間','車廠決策期長；一個 design win 通常還需要車型開發、驗證、量產與實際銷量才能變成收入。',[
  ['收入路徑','被選入平台 → 車型開發 → SOP 量產 → 每車搭載與交付。'],['追蹤','已量產車型、搭載率、每車內容價值與實際出貨。'],['誤讀','多年 pipeline 不是當年營收，也不能直接當成不可取消訂單。'],['失效條件','車款延後、車市疲弱、平台改版或自駕落地慢於預期。']]],
 ['Robotics / Edge｜現場效率比展示更重要','Jetson 偏向裝置端運算，Isaac 提供開發與模擬工具。工具採用與付費硬體出貨需分開追蹤。',[
  ['需求來源','機器視覺、倉儲、工業和機器人等現場推論。'],['追蹤','客戶量產數、實際運作時數、可靠度、維運與回本時間。'],['誤讀','開發套件、示範機與量產模組不能重複計算市場規模。'],['失效條件','感知成功但操作可靠度不足，或導入費用高於節省的人力。']]]
];
append('#products',block('每條產品線都要回答的四個問題',`<div class="notice">以下為商業機制與研究問題，不是各產品線的即時成長評分。產品可跨財報分類，請勿加總為公司營收。</div>`+productDeep.map(([t,p,rows])=>detail(t,`<p>${p}</p>${table(['切面','深讀筆記'],rows)}`)).join(''))+
 detail('名稱別混淆：晶片、主板、整機和機櫃',table(['名稱層級','例子','不能直接比較的原因'],[
 ['架構','Hopper、Blackwell、Rubin','架構名稱不是固定售價、配置或交貨狀態。'],
 ['GPU / CPU','Blackwell GPU、Grace CPU','運算角色不同；產品代號也不等同系統名稱。'],
 ['模組／平台／完整系統','HGX、DGX','不同供應形式與配置；比較前核對包含的 CPU、記憶體及網路。'],
 ['機櫃級系統','GB200 NVL72','官方描述為 72 顆 Blackwell GPU、36 顆 Grace CPU 的液冷設計；不能拿一櫃與單張卡比成本。']])+`<p>${a('blackwell','Blackwell 官方規格')}。這裡的配置例子只指 GB200 NVL72，不能沿用到所有後續世代。</p>`));
// Make original product controls open substantive content, with keyboard support.
const productDetails=document.querySelectorAll('#products .depth details');
document.querySelectorAll('.product-card').forEach((el,i)=>{
 el.setAttribute('role','button'); el.setAttribute('aria-expanded','false');
 const open=()=>{productDetails[i].open=true;el.setAttribute('aria-expanded','true');productDetails[i].scrollIntoView({behavior:'smooth',block:'center'});};
 el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
 productDetails[i].addEventListener('toggle',()=>el.setAttribute('aria-expanded',String(productDetails[i].open)));
});

append('#supply-chain',block('從產能到交付：先找最慢的那一段',`<p>把各環節產出換算成「同一配置可完成的系統套數」後，短期交付能力受到最少的一段限制。這是教學模型；實務還要考慮在製品、良率、交期、替代料、認證與存貨。</p><form id="chainForm"><div class="research-grid">${input('cWafer','合格晶片可配套數',120,0)}${input('cPack','封裝可完成套數',90,0)}${input('cHBM','HBM 可配套數',100,0)}${input('cRack','整機測試可完成套數',110,0)}${input('cPower','機房可上線套數',70,0)}${input('cDemand','客戶需求套數',130,0)}</div><button type="submit">找出交付限制</button><output id="chainResult" aria-live="polite"></output><div id="chainBars"></div></form><p class="muted">同一期間、同一系統規格的假設值。部署上限不等於 NVIDIA 當季收入認列上限；認列須看合約。</p>`)+
 detail('瓶頸移動，受惠者也會改變',`<p>若上線能力只有 70 套，封裝從 90 增到 140，短期可上線仍為 70。若供電增至 100，封裝才會以 90 套成為下一個限制。分析時要分「擴產消息」「可用合格產出」「整機交付」「客戶上線」。這也解釋了為何同一條 AI 供應鏈可能出現不同的營收節奏。</p><p><strong>反方情境：</strong>如果客戶需求降到 60 套，原本的供給瓶頸會轉成利用率與庫存問題。瓶頸解除不保證每個供應商獲利同步增加；價格、折舊和競爭也會改變。</p>`)+
 detail('台灣供應鏈：角色、利潤來源與查核界線',table(['角色／例子','價值在哪裡','要深入問什麼'],[
 ['晶圓代工／TSMC','製程能力、良率與產能分配','HPC 也含非 NVIDIA 需求；擴廠支出何時變成可用產能？'],
 ['封裝／CoWoS 生態系','晶片、HBM 與基板整合','看到的是名目產能還是合格出貨？配套材料與測試是否同步？'],
 ['系統 ODM／QCT、緯穎、鴻海等產業角色','設計整合、製造與交付管理','屬於哪個平台與客戶？買料組裝會放大營收，但毛利結構不同。'],
 ['散熱、電源、連接與機房工程','把機櫃功耗轉成能實際運行的設施','設計入選、認證、量產、驗收是四種不同證據。'],
 ['HBM 供應商／SK hynix、Micron、Samsung','記憶體堆疊、頻寬、容量與良率','哪一世代、哪一客戶認證？產業市占不可直接當 NVIDIA 採購占比。']])+`<p>公司名稱為角色例子，非個別訂單確認；${a('ts','TSMC 2Q26 官方文件')}可交叉查閱。不要把整個伺服器產業的成長全部歸因於 NVIDIA。</p>`)+
 detail('Scale-up 與 Scale-out：網路要分層看',`<p><strong>Scale-up：</strong>在緊密互連範圍內讓更多 GPU 高速協作，例如 NVLink 系統。<strong>Scale-out：</strong>跨節點或機櫃擴大叢集，會涉及 Ethernet、InfiniBand、交換器和光連接。兩者處理不同層級的傳輸需求。</p><p>研究時把 GPU、互連、網路和軟體一起看：若算力翻倍但資料傳輸跟不上，實際吞吐量可能只提高一小部分。供應商宣稱的線速頻寬不等於模型端到端效能。</p>`));

append('#events',block('同一則消息，用四個時間尺度消化',table(['消息','當日到一週','一至兩季','一年以上'],[
 ['新品或跑分','市場如何修正期待；價格反應不證明量產','合格交付、客戶使用、成本與毛利','換代頻率是否提高客戶更新意願或造成延後採購'],
 ['電力與液冷資格計畫','生態系公告','場址工程、設備驗收和可通電容量','縮短建置時間能否增加整體投資回報'],
 ['機器人開發工具','開發者關注與試用','試點轉量產、模組採購','維運成本、可靠度與商業規模'],
 ['客戶資本支出上升','看公告和原先指引的差異','資金何時支付、多少用於設備','AI 收入與現金回報能否支撐下一輪投入']]))+
 detail('讀懂 3.7 倍效能：要追問哪六件事？',`<p>9 月 16 日的官方文章把 Rubin 結果列為預覽提交。解讀時固定六項：<strong>模型、精度與品質、輸入輸出長度、併發量、延遲門檻、硬體與軟體配置</strong>。不同場景的「最高倍數」不能相乘，也不能直接當成營收增幅。${a('ml','原文與測試條件')}</p><p><strong>分析推論：</strong>若每次合格任務成本下降，客戶可用同樣預算做更多事；也可能先以現有設備完成需求而減少新增採購。需要以實際使用量與下一輪訂單區分。</p>`)+
 detail('融資支持 AI 建設：需求與資金來源要分開',`<p>設備需求是否存在，以及誰先支付款項，是不同問題。即使融資安排促進建設，仍需追蹤資金是否真正到位、採購承諾是否可取消、擔保與殘值由誰承擔，以及終端客戶是否產生足夠現金。</p><p>查核順序：正式文件 → 已承諾金額 → 實際提款／付款 → 交付 → 使用率 → 終端回款。意向規模不能當成當期收入；供應商投資客戶也不能單憑新聞判斷為虛假需求，需核對交易條件。</p>`)+
 detail('事件證據分級與更新條件',table(['證據','可支持的結論','仍不能證明'],[
 ['已申報財報與附註','特定期間、口徑下的已報告結果','未來一定延續'],['公司指引／官方發布','管理層預期、產品公布或既定測試結果','已達成全部預測、獨立驗證的使用效益'],['供應商／客戶正式說明','各自揭露的採購、產能或部署','對方未公布的完整訂單份額'],['產業訪談與媒體','提出待查線索','未經查核的訂單、時程或股價目標']])));

const periods={
 intraday:{title:'日內｜當日完成的觀察',chart:'先看日 K 背景，再用 5–15 分鐘 K 線觀察；每一根 K 都須確認是否完整。',evidence:'觀察價差、成交量、當日 VWAP 與消息發生時間。VWAP 是成交量加權平均價格，每次交易時段的設定會影響它。',invalid:'盤前、盤後與正常時段分開比較；跳空或流動性差時，限價單可能不成交，停損也不保證成交價。',routine:'交易前寫好失效位置與最大可承受金額，結束後記錄實際成本。不在圖上補畫一個事前沒有的理由。'},
 swing:{title:'短線／波段｜約 2–20 個交易日',chart:'週 K 看背景、日 K 定義結構；盤中圖只協助觀察執行，不改寫日 K 假設。',evidence:'以明確區間、完整收盤、相對量與 NVDA／QQQ 同期報酬交叉檢查；均線和 MACD 同源，別重複計分。',invalid:'收盤回到原區間、重要轉折失守或催化劑不成立。若原本是短線失敗，不能只因虧損就改成長期持有。',routine:'每日收盤檢查結構、隔日事件、計畫損失與持有期限；財報前決定是否承擔隔夜跳空。'},
 position:{title:'中期｜約 1–6 個月',chart:'以週 K 與日 K 配合，50／200 日線描述中長期方向；沒有固定最佳參數。',evidence:'財報、毛利與指引修正搭配價格相對表現；營運改善但價格不動，可能已反映預期。',invalid:'成長假設落空、估值條件改變或價格結構持續轉弱，分辨哪一種觸發原本計畫。',routine:'每週記錄訊號；每次財報重做情境，不因一天震盪重寫整個投資論點。'},
 long:{title:'長期｜一年以上',chart:'月 K／週 K 看波動背景，不能用幾天 RSI 決定長期競爭力。',evidence:'客戶回報、平台採用、資本配置、競爭與自由現金流；納入產品換代和需求循環。',invalid:'公司競爭地位或經濟效益發生持續變化，或買入時對價格與回報的前提不再成立。',routine:'季度深入檢討、年度重估；分散程度與單一產業曝險同樣重要。'}
};
append('#technical',block('先選週期，再決定訊號的用途',`<div class="period-buttons" role="group" aria-label="觀察週期">${Object.entries(periods).map(([key,v],i)=>`<button type="button" data-period="${key}" aria-pressed="${i===1}">${v.title.split('｜')[0]}</button>`).join('')}</div><div id="periodBody" class="panel period-body" aria-live="polite"></div><p class="muted">上述持有期間是研究分類，不是回報保證；不涉及帳戶交易資格或券商規則判斷。</p>`)+
 detail('公式與資料：指標算出來之前，先檢查輸入',table(['指標','計算要點','檢查'],[
 ['SMA / EMA','SMA 為 N 期平均；EMA 常用權重 2/(N+1)','EMA 起始種子與暖機資料不同，初期值可能不同。'],['RSI 14','100 − 100/(1+RS)，RS 為平滑平均漲幅／跌幅','常用 Wilder 平滑；不是所有平台都以相同起始值計算。'],['ATR 14','TR=max(高−低, |高−前收|, |低−前收|)，再平滑','只描述波動；以 ATR 倍數規劃距離不代表虧損有上限。'],['VWAP','Σ(各筆成交價 × 成交量)／Σ成交量','圖表有時以每根 K 代表價近似；重置時間及盤前盤後會影響。'],['相對量','完整日量／前 N 個完整交易日均量','盤中宜對照歷史同一時間的累積量；本站未接此資料。'],['相對表現','兩個標的同期間報酬或價格比值','復權方式、交易日與起算點必須一致；RSI 不是相對表現。']])+`<p>${a('rsi','RSI 方法來源')} · ${a('atr','ATR 方法來源')}。本站沒有自動計算 NVDA 當前指標。</p>`)+
 detail('三個教學交易劇本：先寫失效，再談獲利',table(['劇本（全為假設價）','原始計畫','如何判讀'],[
 ['突破','區間上緣 100，假設進場 102、失效 97、觀察價 112','每股計畫風險 5、假設報酬 10＝2R；不代表一定到達或勝率足夠。'],['回檔','假設進場 100、失效 96、觀察價 108','若跳空到 92 才能出場，每股實損 8＝2R，超過原計畫。'],['財報','假設持有成本 100，原停損 95，盤後重大消息','次日可能無法在 95 成交；只依原停損估計部位會低估事件風險。']]))+
 block('期望值實驗室｜高勝率不等於有利可圖',`<p>R 代表原始單筆計畫風險。輸入的是一組假設或已整理樣本，並非本站對 NVDA 的回測。</p><form id="expectForm"><div class="research-grid">${input('eWin','勝率（%）',40,0,100)}${input('eGain','平均獲利（R）',2,0)}${input('eLoss','平均虧損（R）',1,0)}${input('eCost','每筆平均成本（R）',0.05,0)}</div><button type="submit">計算假設期望值</button><output id="expectResult" aria-live="polite"></output></form><p class="muted">E＝勝率 × 平均獲利 − 敗率 × 平均虧損 − 成本。損益兩平勝率＝（平均虧損＋成本）／（平均獲利＋平均虧損）。需計入所有交易，避免只留下成功案例。</p>`)+
 detail('回測和實際交易差在哪裡？',`<ul><li>未收盤 K 線的訊號可能消失；不能用當日完整數據假裝在更早時間知道結果。</li><li>拆股與配息處理要一致；價格復權與成交量調整不能任意混用。</li><li>成本包含買賣價差、滑價與可能的費用；成交量不足時，圖上價格不代表可執行價格。</li><li>參數在同一批歷史資料反覆調整，容易只適合那段行情；留出未參與調參的樣本。</li><li>檢查最大回撤、連續虧損、樣本數與不同市場環境。幾筆獲利不證明方法有效。</li></ul>`));

append('#watchlist',block('一張論點，配一個反方與一個檢查期限',table(['研究假設','支持證據','反方證據','何時重看'],[
 ['需求擴張可持續','客戶上線、使用、回款與再採購','CapEx 高但使用率／回款跟不上','客戶及 NVIDIA 每季財報'],['新品提高客戶效益','同品質、延遲與成本下的實際測試','跑分快但部署、功耗或成本抵銷','量產及客戶部署里程碑'],['供應限制逐步解除','合格產出、整機交付、可通電容量','只有擴廠公告或新增其他瓶頸','各供應商每季與正式公告'],['競爭優勢仍具價值','跨工作負載效率、工具與移植成本','特定工作大規模轉至其他晶片','實際生產部署而非單一展示']]))+
 block('研究紀錄表｜把判斷留在當時',`<p>以下紀錄只存目前瀏覽器；請定期匯出備份。原有自由筆記保留。</p><form id="journalForm"><div class="research-grid"><label for="jDate">觀察日期<input id="jDate" type="date" required></label><label for="jCycle">判斷週期<select id="jCycle"><option>日內</option><option selected>波段</option><option>中期</option><option>長期</option></select></label><label for="jReview">下次檢查日期<input id="jReview" type="date" required></label></div><label for="jThesis">假設與理由<textarea id="jThesis" maxlength="2000" required placeholder="例如：供應改善能在未來兩季反映為交付增加。"></textarea></label><label for="jEvidence">證據與來源<textarea id="jEvidence" maxlength="3000" required placeholder="填入文件日期、數字口徑與來源網址。"></textarea></label><label for="jInvalid">什麼發生時，我會承認判斷失效？<textarea id="jInvalid" maxlength="2000" required></textarea></label><button type="submit">新增本機紀錄</button> <button type="button" id="exportJournal">匯出筆記與紀錄</button><p id="journalStatus" role="status"></p></form><div id="journalList"></div>`));

const terms=[['TTFT','Time to First Token；收到第一個輸出 token 前的等待時間。'],['TPOT','Time Per Output Token；後續 token 的生成時間，常用來描述互動速度。'],['KV cache','推論時保存注意力運算需要的中間資料；上下文變長或併發增加會占用更多記憶體。'],['MoE','Mixture of Experts；每次處理啟用部分專家，不代表其他記憶體和通訊需求消失。'],['NVLink','NVIDIA 的高速互連技術；需依平台與世代核對配置。'],['Scale-up / Scale-out','前者擴大緊密協作的運算範圍；後者跨節點擴大叢集。'],['SOP','Start of Production；開始量產，和設計採用不同。'],['BESS / CDU','電池儲能系統／冷卻液分配單元；屬機房運作的配套。'],['PUE','資料中心總耗電／IT 設備耗電；不是 GPU 使用率，也不能單獨代表每次任務成本。'],['DSO / DIO','應收帳款天數／存貨天數；比較要用同期間及相同平均方式。'],['VWAP','成交量加權平均價格；須先指定計算時段。'],['R / Drawdown','R 是單筆原始計畫風險；回撤是資產價值由高點往下的幅度。'],['基點 bps','1 個基點＝0.01 個百分點；50 bps＝0.5 個百分點。'],['TTM / NTM','過去十二個月／未來十二個月；後者通常是預測，不要混用。'],['營運槓桿','收入變化經固定與變動成本結構放大或縮小為利益變化，不是融資槓桿。'],['稀釋股數','考慮潛在普通股影響的每股盈餘分母，並非只看期末已發行股數。']];
$('terms').insertAdjacentHTML('beforeend',terms.map(([t,d])=>`<article class="panel"><h3>${t}</h3><p>${d}</p></article>`).join(''));
$('termStatus').textContent=`共 ${$('terms').children.length} 個名詞`;
append('#glossary',block('查證索引｜從原始來源開始',table(['來源','可查什麼','使用界線'],[
 [a('q','Q2 FY2027 官方財報'),'2026-08-26 發布；季度業績、指引與會計口徑','指引與實績分開；下一次更新須重新核對。'],[a('annual','FY2026 年度財報'),'年度營收與 Q4 歷史基準','歷史圖不是最新季度。'],[a('blackwell','Blackwell 官方產品頁'),'產品配置與技術背景','規格與行銷倍數不是客戶投資回報。'],[a('inference','推論最佳化')+' / '+a('dynamo','Dynamo 文件'),'Prefill、Decode 與排程機制','文件可能更新；實際瓶頸依模型與配置。'],[a('ts','TSMC 2Q26 法說'),'製程、資本支出與產業需求背景','全公司數據不是 NVIDIA 專用產能。'],[a('dsx','DSX Ready')+' / '+a('ml','MLPerf 預覽')+' / '+a('robot','Isaac ROS 5.0'),'2026-09-21／09-16／09-22 事件原文','公司來源；本文影響推演為研究分析。'],[a('rsi','RSI')+' / '+a('atr','ATR'),'技術指標計算與限制','不提供當前 NVDA 訊號。']])));

// Lightweight, deterministic calculators. No market data requests.
function valuation(){if(!valid(['vEPS','vPE','vPrice'])){$('valueResult').textContent='請輸入大於零的有效數值。';return;}const eps=num('vEPS'),pe=num('vPE'),p=num('vPrice'),v=eps*pe;if(!Number.isFinite(v)){$('valueResult').textContent='數值過大，請縮小輸入。';return;}$('valueResult').textContent=`假設價格 $${money(v)}｜相對比較價格 ${(100*(v/p-1)).toFixed(1)}%｜維持本益比 ${pe} 倍時，比較價格所需 EPS 為 $${money(p/pe)}。`;$('valueTable').innerHTML=table(['EPS / 本益比',...[0.8,1,1.2].map(k=>(pe*k).toFixed(1)+' 倍')],[0.8,1,1.2].map(k=>['EPS $'+money(eps*k),...[0.8,1,1.2].map(j=>'$'+money(eps*k*pe*j))]));}
function chain(){const ids=['cWafer','cPack','cHBM','cRack','cPower','cDemand'];if(!valid(ids)){$('chainResult').textContent='請輸入非負的有效套數。';return;}const names=['合格晶片','封裝','HBM','整機測試','機房上線','客戶需求'],values=ids.map(num),limit=Math.min(...values),high=Math.max(...values,1);$('chainResult').textContent=`此模型可上線上限：${limit.toLocaleString()} 套｜限制環節：${names.filter((_,i)=>values[i]===limit).join('、')}。非公司出貨預測。`;$('chainBars').innerHTML=values.map((v,i)=>`<div class="capacity-row"><span>${names[i]}</span><progress value="${v}" max="${high}" aria-label="${names[i]} ${v} 套"></progress><strong>${v}</strong></div>`).join('');}
function expect(){if(!valid(['eWin','eGain','eLoss','eCost'])){$('expectResult').textContent='請輸入有效值，勝率介於 0–100%。';return;}const p=num('eWin')/100,g=num('eGain'),l=num('eLoss'),c=num('eCost'),e=p*g-(1-p)*l-c,be=g+l>0?(l+c)/(g+l)*100:null;$('expectResult').textContent=`假設每筆期望值 ${e.toFixed(3)}R｜${be===null?'獲利與虧損皆為零，無法計算損益兩平勝率。':be>100?'成本過高，損益兩平所需勝率超過 100%。':`損益兩平勝率 ${be.toFixed(1)}%。`} 不是未來實績預測。`;}
[['valueForm',valuation],['chainForm',chain],['expectForm',expect]].forEach(([id,fn])=>{$(id).addEventListener('submit',e=>{e.preventDefault();fn();});fn();});
function period(key){const p=periods[key];$('periodBody').innerHTML=`<h4>${p.title}</h4><p><strong>圖表：</strong>${p.chart}</p><p><strong>證據：</strong>${p.evidence}</p><p><strong>失效與限制：</strong>${p.invalid}</p><p><strong>檢查節奏：</strong>${p.routine}</p>`;document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period===key)));}
document.querySelectorAll('[data-period]').forEach(b=>b.addEventListener('click',()=>period(b.dataset.period)));period('swing');

// User text only enters the DOM through textContent.
let records=[];let journalReadable=true;try{const saved=JSON.parse(localStorage.getItem('nvda-research-journal-v3')||'[]');if(Array.isArray(saved))records=saved.filter(x=>x&&typeof x==='object');}catch{journalReadable=false;$('journalStatus').textContent='舊紀錄無法讀取，暫停新增以避免覆寫；原始資料仍保留。';}
function renderJournal(){const container=$('journalList');container.replaceChildren();if(!records.length){const p=document.createElement('p');p.textContent='尚無結構化紀錄。';container.append(p);}records.slice().reverse().forEach(r=>{const art=document.createElement('article');art.className='panel journal-record';const h=document.createElement('h4');h.textContent=`${r.date||''} · ${r.cycle||''} · 下次檢查 ${r.review||''}`;art.append(h);[['假設',r.thesis],['證據',r.evidence],['失效條件',r.invalid]].forEach(([label,value])=>{const p=document.createElement('p');p.textContent=label+'：'+(value||'');art.append(p);});container.append(art);});}
const today=new Date();$('jDate').value=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
$('journalForm').addEventListener('submit',e=>{e.preventDefault();if(!journalReadable){$('journalStatus').textContent='現有紀錄無法讀取；未新增或覆寫。';return;}const record={date:$('jDate').value,cycle:$('jCycle').value,review:$('jReview').value,thesis:$('jThesis').value.trim(),evidence:$('jEvidence').value.trim(),invalid:$('jInvalid').value.trim()};if(!record.thesis||!record.evidence||!record.invalid){$('journalStatus').textContent='請填完假設、證據與失效條件。';return;}if(record.review<record.date){$('journalStatus').textContent='檢查日期不能早於觀察日期。';return;}const next=[...records,record];try{localStorage.setItem('nvda-research-journal-v3',JSON.stringify(next));records=next;renderJournal();$('journalStatus').textContent='已儲存於此瀏覽器，尚未同步至其他裝置。';['jThesis','jEvidence','jInvalid'].forEach(id=>$(id).value='');}catch{$('journalStatus').textContent='儲存失敗，請保留表單文字並檢查瀏覽器儲存空間。';}});
$('exportJournal').addEventListener('click',()=>{let checks={};document.querySelectorAll('[data-persist]').forEach(el=>checks[el.dataset.persist]=el.checked);const payload={version:3,exportedAt:new Date().toISOString(),records,notes:$('decisionNotes').value,checks};const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const el=document.createElement('a');el.href=url;el.download='nvda-research-notes.json';el.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('journalStatus').textContent='已啟動備份下載，請確認檔案已保存；備份含個人筆記。';});renderJournal();

// Navigation stays compact on mobile; all anchors refer to existing sections.
document.querySelector('nav').innerHTML='<a href="#learn">入門</a><a href="#market">行情</a><a href="#technical">技術</a><a href="#financials">財報</a><a href="#products">產品</a><a href="#supply-chain">供應鏈</a><a href="#events">時事</a><a href="#watchlist">紀錄</a><a href="#glossary">字典</a>';
document.querySelector('.hero').insertAdjacentHTML('afterend',`<div class="shell reading-map"><strong>深讀版 3</strong><span>先理解生意，再驗證數字。</span><a href="#financials">最新核對財報</a><a href="#chainForm">供應瓶頸試算</a><a href="#valueForm">估值敏感度</a><a href="#technical">分週期研判</a></div>`);
})();
