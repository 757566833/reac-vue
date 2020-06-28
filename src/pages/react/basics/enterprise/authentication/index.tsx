import React from 'react';
import { reactHOC } from '@/util/react';

const Index: React.FC= () => {
  console.log('page');
  // const list = useMemo(()=><List/>, []);
  // const test = ()=>{
  //   console.log('test');
  // };
  // useEffect(()=>{
  //   store.subscribe(test);
  // }, []);
  return (
    <div>react </div>
  );
};
export const JSComponent = reactHOC(Index);
