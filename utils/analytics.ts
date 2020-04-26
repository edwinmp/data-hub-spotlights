export const addEvent = (eventName: string, data: {}): void => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: eventName,
    ...data
  });
};
