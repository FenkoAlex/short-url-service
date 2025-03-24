export const routes = {
  mainPage: '/',
  panel: '/panel',
  create: '/create',
};

export const apiPrefix = '/api/v1';
export const apiRoutes = {
  createUrl: `${apiPrefix}/shorten`,
  getInfo: (alias: string) => `${apiPrefix}/info/${alias}`,
  deleteUrl: (alias: string) => `${apiPrefix}/delete/${alias}`,
  getAnalytics: (alias: string) => `${apiPrefix}/analytics/${alias}`,
};
