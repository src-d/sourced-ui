/* eslint-disable no-unused-vars */
import React from 'react';
import UASTButton from './UASTButton';

function isUAST(st) {
  try {
    JSON.parse(st);
    return st.includes('"@pos"');
  } catch (error) {
    return false;
  }
}

function cellRenderer({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex,
}) {
  const st = String(cellData);
  if (isUAST(st)) {
    return (<UASTButton uast={st} />);
  }

  return st;
}

export { cellRenderer, isUAST };
