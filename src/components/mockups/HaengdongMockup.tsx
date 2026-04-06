"use client";

const members = [
  { name: "토다리", color: "#818cf8" },
  { name: "쿠키", color: "#f472b6" },
  { name: "소하", color: "#34d399" },
  { name: "웨디", color: "#fb923c" },
];

const bills = [
  { title: "저녁 식사", amount: "82,000", payer: "토다리" },
  { title: "카페", amount: "24,500", payer: "쿠키" },
  { title: "택시", amount: "15,000", payer: "소하" },
];

export default function HaengdongMockup() {
  return (
    <div className="bg-[#f0f4ff] rounded-xl p-4 text-[11px] w-full max-w-[240px] shadow-lg">
      {/* Header */}
      <div className="text-center mb-3">
        <div className="text-[10px] text-blue-400 font-medium">모임 정산</div>
        <div className="text-base font-bold text-gray-800">제주도 여행</div>
      </div>

      {/* Members */}
      <div className="flex justify-center gap-1 mb-3">
        {members.map((m) => (
          <div key={m.name} className="flex flex-col items-center gap-0.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ backgroundColor: m.color }}
            >
              {m.name[0]}
            </div>
            <span className="text-[8px] text-gray-500">{m.name}</span>
          </div>
        ))}
      </div>

      {/* Bills */}
      <div className="space-y-1.5">
        {bills.map((b) => (
          <div
            key={b.title}
            className="bg-white rounded-lg px-3 py-2 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-gray-800">{b.title}</div>
              <div className="text-[9px] text-gray-400">{b.payer}</div>
            </div>
            <div className="font-bold text-gray-800">{b.amount}원</div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-2 text-center">
        <span className="text-[9px] text-gray-400">1인당 </span>
        <span className="font-bold text-blue-600">30,375원</span>
      </div>
    </div>
  );
}
