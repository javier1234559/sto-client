/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';

export const formatJSON = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return new BigNumber(obj.toString()).toString();
  }

  if (Array.isArray(obj)) {
    return obj.map(item => formatJSON(item));
  }

  if (typeof obj === 'object') {
    const formatted: { [key: string]: any } = {};
    for (const key in obj) {
      formatted[key] = formatJSON(obj[key]);
    }
    return formatted;
  }

  return obj;
}; 