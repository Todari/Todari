"use client";

export default function ForcletterMockup() {
  return (
    <div className="bg-white rounded-xl p-4 text-[11px] w-full max-w-[240px] shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">
          🐱
        </div>
        <span className="font-semibold text-gray-800 text-xs">포키</span>
        <span className="text-[9px] text-gray-400 ml-auto">AI 에이전트</span>
      </div>

      {/* Chat bubbles */}
      <div className="space-y-2 mb-3">
        <div className="bg-gray-100 rounded-lg rounded-tl-none px-3 py-2 text-gray-700 max-w-[85%]">
          이번 주 게시물 성과를 분석해드릴게요!
        </div>
        <div className="bg-gray-100 rounded-lg rounded-tl-none px-3 py-2 text-gray-700 max-w-[85%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">도달</span>
            <span className="text-emerald-600 font-bold">+23.4%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">참여율</span>
            <span className="text-emerald-600 font-bold">4.8%</span>
          </div>
        </div>
      </div>

      {/* Mini chart */}
      <div className="bg-gray-50 rounded-lg p-2">
        <div className="text-[9px] text-gray-400 mb-1">주간 도달 추이</div>
        <div className="flex items-end gap-[3px] h-8">
          {[40, 55, 35, 65, 50, 80, 72].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === 5
                    ? "linear-gradient(to top, #f59e0b, #fbbf24)"
                    : "#e5e7eb",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
