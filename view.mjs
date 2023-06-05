export class WakeLockView {
  /** @type {HTMLButtonElement} */
  #button;
  /** @type {HTMLParagraphElement} */
  #message;

  /** @type {import('./controller.mjs').WakeLockController} */
  #controller;

  /**
   * @param {import('./controller.mjs').WakeLockController} controller
   */
  constructor(controller) {
    this.#controller = controller;

    this.#button = document.getElementById("lock-button");
    this.#message = document.getElementById("lock-message");
  }

  /** @param {import('./model.mjs').WakeLockState} state */
  update(state) {
    if (state.error) {
      this.#message.innerHTML = `Error: ${state.error.message}`;
      return;
    }

    if (state.isActive) {
      this.#button.innerText = "Deactivate";
      this.#button.onclick = once(() => {
        this.#controller.releaseLock();
      });
      this.#message.innerHTML = "Wake lock is active";
      return;
    } else {
      this.#button.innerText = "Activate";
      this.#button.onclick = once(() => {
        this.#controller.requestLock();
      });
      this.#message.innerHTML = "Wake lock is inactive";
      return;
    }
  }
}

function once(fn) {
  let called = false;

  return async (...args) => {
    if (called) {
      return;
    }

    called = true;
    return await fn(...args);
  };
}
