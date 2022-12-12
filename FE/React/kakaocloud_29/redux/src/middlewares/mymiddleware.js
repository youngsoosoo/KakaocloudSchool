const mymiddleware = (store) => (next) => (action) => {
  //동작을 로깅
  console.log(action);

  //다음 미들웨어나 리듀서에게 전달
  const result = next(action);

  //작업이 끝나고 난 후 확인
  console.log(store.getState());

  return result;
};

export default mymiddleware;
