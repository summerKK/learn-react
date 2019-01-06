import {laravelUserList} from "@/services/laravelUsers";

export default {
  namespace: 'laravelUsers',

  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    * queryList({payload}, {call, put}) {
      const response = yield call(laravelUserList, payload)
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
