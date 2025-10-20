import React from "react";
import FireworksCanvas from "../components/FireworksCanvas";

export default function Fireworks() {
  return (
    <div className="relative w-full h-screen">
      <FireworksCanvas />

      {/* Info overlay matching the requested notes */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-md text-sm backdrop-blur border border-white/20">
        <div className="flex flex-col items-center gap-1 text-center">
          <div>🔉🔊 Select the speaker to unmute</div>
          <div>▶⏸ Play button to pause or resume</div>
          <div>☸ Settings button to customize</div>
          <div>You can tap the screen to set off fireworks at that location</div>
        </div>
      </div>
    </div>
  );
}