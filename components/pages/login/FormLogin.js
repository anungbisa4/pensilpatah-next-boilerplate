import { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import EyeIcon from "@/components/Icons/EyeIcon";
import { XCircleIcon } from "@heroicons/react/outline";
import Shake from "react-reveal/Shake";
// import Ripples from "react-ripples";

import { LoginContext } from "@/utils/contexts/loginContext";

const Nav = dynamic(() => import("@/components/Navigation/Nav"));
const InputField = dynamic(() => import("@/components/Form/InputField"));

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username minimum 2")
    .max(100, "Username too long")
    .required("Username Required"),
  password: Yup.string()
    .min(2, "password minimum 2")
    .max(100, "password too long")
    .required("password Required"),
});
function FormLogin() {
  const { status, setStatus } = useContext(LoginContext);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const _onLogin = (values) => {
    console.log(values);
  };
  const _onChecked = (e) => {
    setChecked(!checked);
  };
  return (
    <>
      {status === "login" && (
        <div className="form-login w-full bg-white">
          <div className="absolute inset-x-0 top-0  z-50">
            <Nav backNav />
          </div>
          <section className="pt-76pt mx-auto px-6 w-298pt min-h-screen bg-white">
            <h1 className="text-center text-3xl font-semibold text-blue-primary">
              Log In
            </h1>
            <div className="p-6" />
            <Formik
              className="mt-12"
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={_onLogin}
            >
              {({ errors, touched, values, isValid, dirty, ...props }) => {
                console.log(props);
                return (
                  <Form className="relative">
                    <InputField
                      name="username"
                      placeholder="Username"
                      className={`${
                        values.username.length > 0
                          ? "border-blue-primary"
                          : "border-gray-light-dark"
                      } text-sm sm:text-base relative w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-blue-primary py-4 px-6 rounded-full`}
                    />
                    <div className="p-2" />
                    <div className="relative">
                      <div
                        className="absolute z-10 p-2 flex border border-transparent right-0 top-0 h-full w-14"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <EyeIcon
                          className={`cursor-pointer w-6 ${
                            showPassword
                              ? "text-blue-primary"
                              : "text-gray-light-dark"
                          }`}
                        />
                      </div>
                      <InputField
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className={`${
                          values.password.length > 0
                            ? "border-blue-primary"
                            : "border-gray-light-dark"
                        } text-sm sm:text-base relative w-full border placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-4 px-6 rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-5 px-16pt">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 sm:h-4 h:w-4 text-blue-primary"
                          checked={checked}
                          onChange={_onChecked}
                        />
                        <span className="ml-1 sm:ml-2 text-gray-warm text-xs sm:text-sm">
                          Remember Me
                        </span>
                      </label>
                      <a href="#" className="text-gray-warm text-xs sm:text-sm">
                        Forgot password?
                      </a>
                    </div>
                    <div className="p-8 relative">
                      {(errors.username || errors.password) && (
                        <Shake>
                          <div className="absolute bottom-4 left-0 flex justify-center items-center w-full text-center text-red-error">
                            <XCircleIcon className="w-6 mr-3" />
                            <label name="error" className="text-xs sm:text-sm">
                              {errors.username && errors.password
                                ? "Couldn’t find your account"
                                : errors.username || errors.password}
                            </label>
                          </div>
                        </Shake>
                      )}
                    </div>
                    <div className=" flex w-full justify-center">
                      {/* <Ripples className="rounded-full"> */}
                      <button
                        disabled={!isValid || !dirty}
                        className=" text-white bg-gradient-to-r from-blue-primary to-blue-dark-sky focus:from-green-400 focus:to-blue-500 border-0 py-3 px-76pt focus:outline-none hover:bg-blue-dark-sky rounded-full disabled:opacity-50"
                      >
                        Log In
                      </button>
                      {/* </Ripples> */}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </section>
        </div>
      )}
    </>
  );
}

export default FormLogin;
