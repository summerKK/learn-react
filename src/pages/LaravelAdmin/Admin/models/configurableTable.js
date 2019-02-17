import {configurableTable} from "@/services/laravelUsers";

export default {
  namespace: 'configureableTable',

  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    * queryList({payload}, {call, put}) {
      const response = yield call(configurableTable, payload)
      yield put({
        type: 'save',
        payload: response,
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
}
