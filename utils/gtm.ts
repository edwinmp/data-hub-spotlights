export {};

declare global {
  interface Window {
    dataLayer: any;
  }
}

export const addEvent = (eventName: string, data: any): void => {
  window.dataLayer.push({
    event: eventName,
    ...data
  });
};
