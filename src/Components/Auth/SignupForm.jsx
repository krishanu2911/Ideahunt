import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { HeaderText, Textbox, Toast } from "Components";
import style from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../Context";
import { emailRegex, passwordRegex } from "../../Regex/Regex";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon, ChevronRightIcon } from "@chakra-ui/icons";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  let navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [submitMode, setSubmitMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: {
      isError: false,
      errorMessage: "Enter a valid mail",
    },
    password: {
      isError: false,
      errorMessage:
        "Minimum eight characters, at least one letter, one number and one special character",
    },
  });
  const { themeState } = useTheme();
  const { theme } = themeState;
  const textAuth = theme === "light" ? style.text_light : style.text_dark;
  const { signUp } = useAuth();

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const validateError = validateForm(name, value);
    setError(prevValue => ({
      ...prevValue,
      [name]: {
        ...prevValue[name],
        isError: validateError,
      },
    }));
    setForm({ ...form, [name]: value });
  };

  const SubmitHandler = async event => {
    event.preventDefault();
try
    {const { user, error } = await signUp(
      {
        email: form.email,
        password: form.password,
      },
      { firstname: form.firstName, lastname: form.lastName }
    );
    if (error) {
      if(error.status === 400)
      {
        Toast("This email already exists.", "error");
        return;
      }
      setError(error.message);
    } else 
    {
      setForm(defaultForm);
      navigate("/");
      Toast("Signed up successfully","success")
    }}
    catch(e){
      console.log(e)
      Toast("Invalid credentails.", "error");
    }
  };

  const validateForm = (name, value) => {
    switch (name) {
      case "email":
        return !emailRegex.test(value);
      case "password":
        return !passwordRegex.test(value);
      default:
        return false;
    }
  };

  useEffect(() => {
    let flag = false;
    Object.entries(error).forEach(i => {
      if (i[1].isError) {
        flag = true;
      }
    });
    setSubmitMode(flag);
  }, [error]);

  return (
    <div className="centered">
      <form className={style.auth_card} onSubmit={e => SubmitHandler(e)}>
        <HeaderText text="Sign up" />
        <div className={style.name_input}>
          <Textbox
            label="Firstname"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={e => handleChange(e)}
            required
          />
          <Textbox
            label="Lastname"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <Textbox
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={e => handleChange(e)}
          error={error.email.isError}
          required
        />
        {error.email.isError && (
          <span className="text-span text-center">
            {error.email.errorMessage}
          </span>
        )}
        <div className={style.password_fields}>
          <Textbox
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={e => handleChange(e)}
            error={error.password.isError}
            required
          />
          {showPassword ? (
            <ViewIcon
              w={8}
              h={8}
              color="teal"
              className={style.eye_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <ViewOffIcon
              w={8}
              h={8}
              color="teal"
              className={style.eye_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {error.password.isError && (
          <span className="text-span text-center">
            {error.password.errorMessage}
          </span>
        )}
        
        
        
        <Button
          variant="solid"
          width="17rem"
          colorScheme="teal"
          disabled={submitMode}
          error={submitMode}
          type="submit"
        >
          Sign up
        </Button>
        <div className={textAuth}>
          Already have an account?{" "}
          <Link to="/login" className="link">
            <span className={`text-span ${style.account_check}`}>
              Login <ChevronRightIcon />
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { SignupForm };
