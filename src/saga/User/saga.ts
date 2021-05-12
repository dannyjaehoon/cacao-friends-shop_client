import { Dispatch } from 'react';
import { call, put, takeEvery } from 'redux-saga/effects';
import { LOG_IN, SIGN_OUT, LOG_IN_FAILURE, PENDING } from './actions';
import { loginRequest } from 'apis/User';
import { LoginInfo, LoginSuccessInfo } from 'types/User';
import { Action } from 'redux';

export function* loginSaga(userInfo: LoginInfo) {
  try {
    const user: LoginSuccessInfo = yield call(loginRequest, userInfo);
    console.log(user);
    // yield put({ type: LOG_IN, authUser: user });
  } catch (error) {
    yield put({ type: LOG_IN_FAILURE, error });
  }
}
interface PandingAction extends Action, LoginInfo {
  type: 'PENDING';
}

export function* userSaga() {
  yield takeEvery<PandingAction>(PENDING, loginSaga); // 모든 INCREASE_ASYNC 액션을 처리
  // yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// thunk
// export const logInActionAsync = (userInfo: LoginInfo) => async (
//   dispatch: Dispatch<MyDispatch>
// ) => {
//   // 비동기 처리
//   dispatch(pending());
//   try {
//     const res = await loginRequest(userInfo).then(res => res.json());
//     dispatch(logInActionSuccess(res.user));
//   } catch (err) {
//     dispatch(loginActionFailure(err));
//   }

//   return dispatch;
// };
