import { WakeLockController } from "./controller.mjs";
import { createMutableReference } from "./model.mjs";
import { WakeLockView } from "./view.mjs";

if (!("wakeLock" in navigator)) {
  document.getElementById("nolock").classList.remove("hidden");
} else {
  document.getElementById("lock").classList.remove("hidden");

  const state = createMutableReference({ isActive: false, error: null });
  const controller = new WakeLockController(state);
  const view = new WakeLockView(controller);

  state.onUpdate((newState) => {
    view.update(newState);
  });
}
