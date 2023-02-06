/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type Tag = {
  id: string;
  name: string;
  sign: string;
  kind: 'expenditure' | 'income';
};
type ItemList = {
  id: string;
  amount: number;
  tag?: Tag,
  time: string;
  kind: 'expenditure' | 'income';
}[];
