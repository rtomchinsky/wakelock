export class WakeLockController {
  /** @type {import("./model.mjs").MutableReference<import('./model.mjs').WakeLockState>} */
  #state;
  #wakeLock = null;

  /**
   * @param {import("./model.mjs").MutableReference<import('./model.mjs').WakeLockState>} state
   */
  constructor(state) {
    this.#state = state;
  }

  async requestLock() {
    try {
      this.#wakeLock = await navigator.wakeLock.request("screen");
      this.#state.set({ isActive: true, error: null });
      this.#wakeLock.addEventListener("release", () => {
        this.#state.set({ isActive: false, error: null });
      });
    } catch (error) {
      this.#state.set({ isActive: false, error });
    }
  }

  async releaseLock() {
    try {
      if (this.#wakeLock != null) {
        await this.#wakeLock.release();
        this.#wakeLock = null;
        this.#state.set({ isActive: false, error: null });
      }
    } catch (error) {
      this.#state.set({ isActive: false, error });
    }
  }
}
