/** Puente chico entre el contador y la capa de partículas, sin acoplar los componentes. */
const listeners = new Set<() => void>();
let pending = false;

export function burstConfetti() {
  if (listeners.size === 0) {
    pending = true;
    return;
  }
  listeners.forEach((listener) => listener());
}

export function onConfetti(listener: () => void) {
  listeners.add(listener);
  if (pending) {
    pending = false;
    listener();
  }
  return () => {
    listeners.delete(listener);
  };
}
