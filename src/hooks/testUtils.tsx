import React from 'react';
import { mount } from 'enzyme';

const TestHook = ( obj: { callback: ()=> void }) => {
  obj.callback()
  return null;
};

export const testHook = (callback: any) => {
  mount(<TestHook callback={callback} />);
};