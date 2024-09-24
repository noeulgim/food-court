import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/zustand/useAuthStore";

interface FormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleUserStorage = (user: any) => {
    console.log("로컬 스토리지에 저장할 유저 정보:", user);
    localStorage.setItem(
      "user",
      JSON.stringify({ email: user.email, uid: user.uid })
    );
  };

  const handleLogin: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data;
    console.log("로그인 시도:", email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("로그인 성공:", user);
      setUser(user);

      // 유저 정보를 로컬 스토리지에 저장
      handleUserStorage(user);

      const idToken = await user.getIdToken();
      console.log("ID 토큰:", idToken);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`로그인 오류: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleSignUp: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data;
    console.log("회원가입 시도:", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("회원가입 성공:", user);
      setUser(user);

      // 유저 정보를 로컬 스토리지에 저장
      handleUserStorage(user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`회원가입 오류: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("구글 로그인 성공:", user);
      setUser(user);

      // 유저 정보를 로컬 스토리지에 저장
      handleUserStorage(user);
      const idToken = await user.getIdToken();
      console.log("ID 토큰:", idToken);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(`구글 로그인 오류: ${error.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div style={{ paddingTop: "6rem" }}>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={handleSubmit(isLoginMode ? handleLogin : handleSignUp)}
      >
        <input
          className="mb-4 p-4 rounded-md border border-input w-96 text-lg"
          type="email"
          placeholder="Email"
          {...register("email", { required: "이메일을 입력해주세요." })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          className="mb-4 p-4 rounded-md border border-input w-96 text-lg"
          type="password"
          placeholder="Password"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button
          className="mb-4 p-4 rounded-md w-96 text-white bg-slate-500 text-lg"
          type="submit"
        >
          {isLoginMode ? "로그인" : "회원가입"}
        </button>
        <div className="mb-4">or</div>
        <button
          className="mb-4 p-4 rounded-md w-96 bg-slate-100 text-lg"
          type="button"
          onClick={toggleMode}
        >
          {isLoginMode ? "회원가입하기" : "로그인하기"}
        </button>
        <button
          className="mb-4 p-4 rounded-md w-96 bg-slate-200 text-lg"
          type="button"
          onClick={handleGoogleLogin}
        >
          구글로 로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
