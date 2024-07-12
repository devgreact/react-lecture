import React from "react";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { changeEng, changeEtc, changeKor } from "./slices/langSlice";
import {
  getUserAsyncThunk,
  postLoginAsyncThunk,
  showUser,
  userlogin,
} from "./slices/userSlice";
import { postLogin } from "./apis/memberapi/memberapi";
import { AppDispatch, RootState } from "./store";

const RTKSample: React.FC = () => {
  // slice 정보 가져오기
  const themeState = useSelector((state: RootState) => state.themeSlice);
  //console.log(themeState); // {theme:"black"}
  // const colorObj = {
  //   color: themeState.theme,
  // };
  const langState = useSelector((state: RootState) => state.langSlice);
  // store 에서 정의한 action 즉, RootState 업데이트 함수
  const dispatch = useDispatch<AppDispatch>();
  const handleClickKR = () => {
    dispatch(changeKor());
  };
  const handleClickEN = () => {
    dispatch(changeEng());
  };
  const handleClickETC = () => {
    dispatch(changeEtc({ word: "울라불라 쉬었다 갈게요." }));
  };

  // 사용자 정보
  const userState = useSelector((state: RootState) => state.userSlice);
  console.log("사용자 정보 : ", userState);
  // 정보 호출
  const handleClickUser = async () => {
    // 일반적 reducer 함수 호출
    // dispatch(showUser());
    // 비동기 extraReducer 호출
    dispatch(getUserAsyncThunk());
    //dispatch(postLoginAsyncThunk());
    // const result = await postLogin();
    // dispatch(userlogin(result));
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleClickUser();
          }}
        >
          사용자 정보 비동기 호출
        </button>
      </div>

      {userState.id ? (
        <div>
          {userState.id}
          {userState.userId}
          {userState.title}
          {userState.completed}
        </div>
      ) : (
        <div>사용자정보가 없어요.</div>
      )}

      <button
        onClick={() => {
          handleClickKR();
        }}
      >
        한국어
      </button>
      <button
        onClick={() => {
          handleClickEN();
        }}
      >
        영어
      </button>
      <button
        onClick={() => {
          handleClickETC();
        }}
      >
        기타
      </button>
      <h1 style={{ color: themeState.theme }}> {langState.word} RTK 샘플</h1>
      <Menu />
    </div>
  );
};

export default RTKSample;