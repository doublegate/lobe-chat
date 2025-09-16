'use client';

import { StoreApiWithSelector } from '@lobechat/types';
import { createContext } from 'zustand-utils';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Store, store } from './action';

export type { State } from './initialState';

export const createStore = () => createWithEqualityFn(subscribeWithSelector(store as any), shallow) as any;

export const { useStore, useStoreApi, Provider } = createContext<StoreApiWithSelector<Store>>();

export { selectors } from './selectors';
