const Analytics = {
  track: (event: string, params?: Record<string, any>) => {
    console.log('[Analytics]', event, params);
  },
  screen: (name: string) => {
    console.log('[Analytics] Screen:', name);
  },
};

export default Analytics;
