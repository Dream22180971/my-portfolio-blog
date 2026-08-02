"use client";

import type { PointerEvent } from "react";

export function CalibrationField() {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  }

  return (
    <div
      className="calibration-field"
      aria-label="从想法到可靠产品的校准场"
      onPointerMove={handlePointerMove}
    >
      <div className="calibration-field__label">Signal Calibration Field · 01</div>
      <div className="calibration-field__grid" aria-hidden="true" />
      <div className="calibration-field__scan" aria-hidden="true" />
      <div className="calibration-field__crosshair" aria-hidden="true">
        <span className="calibration-field__ring calibration-field__ring--outer" />
        <span className="calibration-field__ring calibration-field__ring--inner" />
        <span className="calibration-field__dot" />
      </div>
      <div className="calibration-field__stages" aria-hidden="true">
        <span>Idea</span>
        <span className="is-signal">Verify</span>
        <span className="is-signal">Build</span>
        <span>Prove</span>
      </div>
    </div>
  );
}
