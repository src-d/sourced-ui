// validation that cellData is JSON happens outside of this function
function isUAST(cellData) {
  // First perform a cheap proxy to avoid calling JSON.parse on data that is clearly not a
  // JSON object or array
  if (typeof cellData !== 'string' || ['{', '['].indexOf(cellData.substring(0, 1)) === -1) {
    return false;
  }

  try {
    JSON.parse(cellData);
    return cellData.includes('"@pos"');
  } catch (_) {
    return false;
  }
}

export default isUAST;
