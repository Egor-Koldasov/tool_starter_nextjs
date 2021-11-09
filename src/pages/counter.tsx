import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { createContext, useContextSelector } from 'use-context-selector';
import Page from '../components/layout/Page';
import RootProvider from '../components/RootProvider';
import { rootContext } from '../state/state-root';

const initState = { email: '0', password: '0' };
type ContextValue = [
  state: typeof initState,
  setState: Dispatch<SetStateAction<typeof initState>>
]
// const context = createContext<ContextValue | null>(null);
const context = rootContext

const Counter1 = () => {
  const count1 = useContextSelector(context, v => v && v[0].email);
  const setState = useContextSelector(context, v => v && v[1]);
  const increment = (event: ChangeEvent<HTMLInputElement>) => setState && setState(s => ({
    ...s,
    email: event.currentTarget.value,
  }));
  console.log('conter 1');
  useEffect(() => console.log('conter 1 commit'))
  return (
    <div>
      <span>Count1: {count1}</span>
      <input
        type="text"
        value={String(count1)}
        onChange={increment}
      />
      {Math.random()}
    </div>
  );
};

const Counter2 = () => {
  const count2 = useContextSelector(context, v => v && v[0].password);
  const setState = useContextSelector(context, v => v && v[1]);
  const increment = (event: ChangeEvent<HTMLInputElement>) => setState && setState(s => ({
    ...s,
    password: event.currentTarget.value,
  }));
  console.log('conter 2');
  useEffect(() => console.log('conter 2 commit'))
  return (
    <div>
      <span>Count2: {count2}</span>
      <input
        type="text"
        value={String(count2)}
        onChange={increment}
      />
      {Math.random()}
    </div>
  );
};

const App = () => (
  <Page>
    <Counter1 />
    <Counter2 />
  </Page>
);

export default App;