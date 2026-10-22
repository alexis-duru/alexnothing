// Coordonne la transition de page (overlay du Menu) et les animations d'entrée des pages.
// Les pages enregistrent leur animation via onRouteReady : elle est jouée tout de suite
// si aucune transition n'est en cours, sinon une fois l'overlay complètement retiré.

let isTransitioning = false;
const listeners = new Set();

export const startRouteTransition = () => {
  isTransitioning = true;
};

export const endRouteTransition = () => {
  isTransitioning = false;
  const callbacks = Array.from(listeners);
  listeners.clear();
  callbacks.forEach((callback) => callback());
};

export const onRouteReady = (callback) => {
  if (!isTransitioning) {
    callback();
    return () => {};
  }

  listeners.add(callback);
  return () => listeners.delete(callback);
};
