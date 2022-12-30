import type { ReactNode } from 'react';
import originalModule from 'react-dom';

module.exports = {
  ...originalModule,
  createPortal: (node: ReactNode) => node
};

export {};
