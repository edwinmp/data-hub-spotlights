/* eslint-disable @typescript-eslint/no-explicit-any */

interface EventData {
  country: string;
  topic: string;
  indicator: string;
  year: string | number;
  topicTwo: string;
  indicatorTwo: string;
  yearTwo: string | number;
  locations: string;
  budgetType: string;
  currency: string;
  locationName: string;
}

export const addEvent = (event: string, data: Partial<EventData>): void => {
  if (window && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...data });
  }
};
