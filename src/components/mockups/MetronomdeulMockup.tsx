"use client";

import { motion } from "framer-motion";

const beats = [0, 1, 2, 3];

export default function MetronomdeulMockup() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-4 text-[11px] w-full max-w-[240px] shadow-lg">
      {/* Room info */}
      <div className="text-center mb-4">
        <div className="text-[9px] text-purple-400 font-medium mb-1">
          합주방
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-4 h-4 rounded-full bg-purple-500/30 flex items-center justify-center text-[8px]">
            👤
          </div>
          <div className="w-4 h-4 rounded-full bg-purple-500/30 flex items-center justify-center text-[8px]">
            👤
          </div>
          <div className="w-4 h-4 rounded-full bg-purple-500/30 flex items-center justify-center text-[8px]">
            👤
          </div>
          <span className="text-[9px] text-gray-500 ml-1">3명 참여 중</span>
        </div>
      </div>

      {/* BPM Display */}
      <div className="text-center mb-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
          className="text-3xl font-bold text-white"
        >
          120
        </motion.div>
        <div className="text-[9px] text-gray-500">BPM</div>
      </div>

      {/* Beat indicator */}
      <div className="flex justify-center gap-3 mb-3">
        {beats.map((b) => (
          <motion.div
            key={b}
            animate={{
              backgroundColor:
                b === 0
                  ? ["#a855f7", "#6b21a8", "#a855f7"]
                  : ["#374151", "#374151", "#374151"],
              scale: b === 0 ? [1, 1.3, 1] : [1, 1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: b * 0.5,
            }}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#374151" }}
          />
        ))}
      </div>

      {/* Synced indicator */}
      <div className="flex items-center justify-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[9px] text-emerald-400">동기화됨</span>
      </div>
    </div>
  );
}
