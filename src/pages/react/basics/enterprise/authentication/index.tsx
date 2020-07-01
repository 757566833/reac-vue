import React from 'react';
import { reactHOC } from '@/util/react';

const Index: React.FC= () => {
  return (
    <div>react </div>
  );
};
export const JSComponent = reactHOC(Index);
