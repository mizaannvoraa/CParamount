export const pageview = (url) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
