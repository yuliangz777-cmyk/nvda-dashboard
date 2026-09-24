window.NVDA_DATA = {
  annualRevenue: {
    labels: ["FY22", "FY23", "FY24", "FY25", "FY26"],
    values: [26.91, 26.97, 60.92, 130.50, 215.90]
  },
  products: [
    { name: "Data Center", desc: "GPU、CPU、NVLink、Networking 與整櫃 AI 系統。", indicator: "雲端 CapEx · GPU utilization" },
    { name: "Gaming", desc: "GeForce RTX、遊戲與創作者平台，觀察換機循環。", indicator: "Steam GPU mix · channel inventory" },
    { name: "Pro Visualization", desc: "RTX 工作站、Omniverse 與專業設計工作流。", indicator: "workstation demand · enterprise adoption" },
    { name: "Automotive", desc: "DRIVE 平台、車載運算與自駕開發工具鏈。", indicator: "design-win pipeline · SOP timing" },
    { name: "Robotics / Edge", desc: "Jetson、Isaac、Physical AI 與邊緣推論平台。", indicator: "developer adoption · module volume" }
  ],
  chain: [
    { title: "設計與軟體", subtitle: "NVIDIA / CUDA", role: "GPU、CPU、DPU、Networking 與 CUDA 軟體生態，決定系統效能與客戶黏著度。", watch: "新品節奏、CUDA 採用、推論效能與整櫃 ASP。" },
    { title: "EDA / IP", subtitle: "Synopsys · Cadence · ARM", role: "提供晶片設計、驗證與 CPU IP，是複雜 AI 晶片如期 tape-out 的基礎。", watch: "先進製程設計複雜度、IP 授權與研發投入。" },
    { title: "晶圓製造", subtitle: "TSMC", role: "先進邏輯晶圓是 GPU 與相關晶片產出的第一個實體瓶頸。", watch: "先進製程產能、良率、wafer allocation 與美國廠爬坡。" },
    { title: "先進封裝", subtitle: "CoWoS · OSAT", role: "把 GPU 與多顆 HBM 整合；產能不足會直接限制可交付的 AI 加速器。", watch: "CoWoS 產能、封裝良率、Amkor 等新增供給。" },
    { title: "記憶體", subtitle: "SK hynix · Micron · Samsung", role: "HBM 頻寬與容量影響 AI 訓練及推論效能，也是成本與供給的重要變數。", watch: "HBM3E/HBM4 認證、供給分配、價格與良率。" },
    { title: "系統與客戶", subtitle: "ODM · CSP · Sovereign AI", role: "伺服器、散熱、電力與資料中心建置決定 NVIDIA 晶片何時轉化為可用算力。", watch: "Hyperscaler CapEx、液冷、電力佈建、交付與庫存。" }
  ]
};
