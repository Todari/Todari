"use client";

const stocks = [
  { name: "삼성전자", change: "+2.8%", positive: true },
  { name: "SK하이닉스", change: "-1.2%", positive: false },
  { name: "현대차", change: "+4.1%", positive: true },
  { name: "NAVER", change: "+0.6%", positive: true },
];

const agents = [
  { name: "전략", vote: "BUY", color: "#22c55e" },
  { name: "기술", vote: "BUY", color: "#22c55e" },
  { name: "감성", vote: "HOLD", color: "#eab308" },
];

export default function TradeTowerMockup() {
  return (
    <div className="bg-[#0d1117] rounded-xl p-4 text-[11px] w-full max-w-[240px] shadow-lg border border-gray-800">
      {/* Portfolio value */}
      <div className="mb-3">
        <div className="text-[9px] text-gray-500">총 자산</div>
        <div className="text-xl font-bold text-white">
          ₩9,958,749
        </div>
        <span className="text-[10px] text-emerald-400 font-medium">
          +3.2% 오늘
        </span>
      </div>

      {/* Stock list */}
      <div className="space-y-1 mb-3">
        {stocks.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between py-1 border-b border-gray-800/50"
          >
            <span className="text-gray-300">{s.name}</span>
            <span
              className="font-medium"
              style={{ color: s.positive ? "#22c55e" : "#ef4444" }}
            >
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* AI Agents */}
      <div className="bg-gray-900/50 rounded-lg p-2">
        <div className="text-[9px] text-gray-500 mb-1.5">AI 에이전트 투표</div>
        <div className="flex gap-2">
          {agents.map((a) => (
            <div
              key={a.name}
              className="flex-1 text-center rounded-md py-1"
              style={{ backgroundColor: `${a.color}15` }}
            >
              <div className="text-[8px] text-gray-400">{a.name}</div>
              <div
                className="text-[10px] font-bold"
                style={{ color: a.color }}
              >
                {a.vote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
