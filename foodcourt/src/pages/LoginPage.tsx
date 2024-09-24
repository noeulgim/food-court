import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { Section } from "@/components/layout/section";
import LoginForm from "@/components/Auth/LoginForm";

interface FormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<FormInputs> = async (data) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

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
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      console.log("ID 토큰:", idToken);
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
    <Section sectionTitle={isLoginMode ? "로그인" : "회원가입"}>
      <LoginForm />
    </Section>
  );
};

export default LoginPage;
