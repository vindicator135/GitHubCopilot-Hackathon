const parseURL = (url) => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const queryParams = {};
    for (let pair of params.entries()) {
      queryParams[pair[0]] = pair[1];
    }
    return {
      protocol: urlObj.protocol,
      host: urlObj.host,
      path: urlObj.pathname,
      queryParams,
      hash: urlObj.hash,
    };
  } catch (error) {
    throw new Error("Invalid URL");
  }
};
