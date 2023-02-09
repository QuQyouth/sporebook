/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'echarts'

type UserFormData = {
  email: string,
  code: string
}

type User = {
  id: string;
  email: string;
}

type Tag = {
  id: string;
  name: string;
  sign: string;
  kind: 'expenditure' | 'income'
};

type TagsList = {
  id: string;
  name: string;
  sign: string;
  kind: 'expenditure' | 'income';
}[]

type ItemList = {
  id: string;
  amount: number;
  tag?: Tag,
  time: string;
  kind: 'expenditure' | 'income'
}[];


type Item = {
  id: string;
  amount: number;
  tag?: Tag,
  time: string;
  kind: 'expenditure' | 'income'
};

type ItemFormDate = {
  id: string;
  name: string;
  amount: string;
  time: string;
  kind: string
}

type HashMap = {
  name: string;
  value: number
}