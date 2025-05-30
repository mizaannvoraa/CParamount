export const GTM_ID = 'GTM-P33RNKLV';

export const pageview = (url) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
