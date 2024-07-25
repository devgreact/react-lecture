# React Hook Form

- https://react-hook-form.com/
- `npm install react-hook-form`

## 1. React Hook Form 기본활용

- 리랜더링을 최소화 함.
- /src/pages/Join.js

```js
import { useForm } from "react-hook-form";

// 폼의 초기값
const initState = {
  userid: "hong",
  email: "a@a.net",
  pass: "12345678",
  phone: "010-0000-0000",
  address1: "080",
};

const Join = () => {
  // form 의 상태를 관리하는 기능
  // register : 각 항목의 데이터를 등록한다.
  // handleSubmit : 전송 이벤트 처리
  // formState : 폼의 데이터
  // setValue :  강제로 값을 셋팅 처리
  // formState : {errors}  폼에 형식에 맞지 않으면 에러출력
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initState });

  //   전화번호 자동 변경
  //   전화번호 자동 변경
  const handleChangePhone = e => {
    const phoneNumber = formatPhoneNumber(e.target.value);
    console.log(phoneNumber);
    setValue("phone", phoneNumber);
  };
  const formatPhoneNumber = value => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
    console.log("전송시 데이터 sendData ", sendData);
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            {...register("userid", { required: "아이디는 필수 입니다." })}
          />
          {errors.userid && <span>{errors.userid.message}</span>}
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            {...register("email", {
              required: "이메일은 필수 항목입니다.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "유효한 이메일 주소를 입력하세요.",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            {...register("pass", {
              required: "비밀번호는 필수 항목입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 입니다.",
              },
              maxLength: {
                value: 16,
                message: "비밀번호는 최대 16자 입니다.",
              },
            })}
          />
          {errors.pass && <span>{errors.pass.message}</span>}
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="text"
            {...register("phone", {
              required: "전화번호는 필수 항목입니다.",
              pattern: {
                value: /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                message: "유효한 전화번호를 입력하세요.",
              },
            })}
            onChange={e => {
              handleChangePhone(e);
            }}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div>
          <label>주소</label>
          <input
            type="text"
            {...register("address1", {
              required: "우편번호는 필수 항목입니다.",
            })}
          />
          {errors.address1 && <span>{errors.address1.message}</span>}
        </div>
        <button type="submit">회원가입</button>
        <button type="reset">재작성</button>
      </form>
    </div>
  );
};

export default Join;
```

## 2. Yup 활용

- 입력내용의 유효성 검사 라이브러리

## 2.1. 설치

- `npm i yup`
- https://github.com/jquense/yup

## 2.2. Hook Form 에 적용

- React Hook Form 에서 활용시 추가 설치
  : https://www.npmjs.com/package/@hookform/resolvers
  : `npm i @hookform/resolvers`
- https://www.react-hook-form.com/advanced-usage/#CustomHookwithResolver

## 2.3. 적용 단계

- yup schema 셋팅
