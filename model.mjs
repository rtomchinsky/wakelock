/**
 * @typedef {object} WakeLockState
 * @property {boolean} isActive
 * @property {Error | null} error
 */

/**
 * @template T
 * @typedef {object} MutableReference
 * @property {(newValue: T) => void} set
 * @property {() => T} get
 * @property {(newValue: T) => void} onUpdate
 */

/**
 * @template T
 * @param {T} initial
 * @returns {MutableReference<T>}
 */
export function createMutableReference(initial) {
  let reference = initial;
  /** @type {Array<(newValue: T) => void>} */
  const listeners = [];

  return {
    /** @param {T} newValue */
    set(newValue) {
      if (reference !== newValue) {
        reference = newValue;
        listeners.forEach((listener) => {
          try {
            listener(newValue);
          } catch (e) {
            console.error(e);
          }
        });
      }
    },
    get() {
      return reference;
    },
    /** @param {(newValue: T) => void} listener */
    onUpdate(listener) {
      listener(reference);
      listeners.push(listener);
    },
  };
}
