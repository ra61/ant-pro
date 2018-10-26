import { querySDKList, querySDKInfo } from '@/services/api';

export default {
  namespace: 'sdk',

  state: {
    SDKList: [],
    SDKInfo: []
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(querySDKList);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchInfo(_, { call, put }) {
      const response = yield call(querySDKInfo);
      yield put({
        type: 'show',
        payload: response,
      });
    }
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
