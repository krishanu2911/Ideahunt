import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { HeaderText, Textbox, Toast } from 'Components';
import style from './Auth.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from 'Context';
import { emailRegex, passwordRegex } from '../../Regex/Regex';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon, ChevronRightIcon } from '@chakra-ui/icons';

const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignupForm = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState(defaultForm);
    const [submitMode, setSubmitMode] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({
        email: {
        isError: false, 
        errorMessage: "Enter a valid mail",
        }, password: {
        isError: false, 
        errorMessage: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
        }, confirmPassword: {
        isError: false,
        errorMessage: "Password does not match",
        }
    });
    const { themeState } = useTheme();
    const { theme } = themeState;
    const textAuth = theme==="light" ? style.text_light : style.text_dark;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name==="password") {
          setCheckPassword(value)
        }
        const validateError = validateForm(name, value);
        setError((prevValue) => ({
          ...prevValue,
          [name]: {
            ...prevValue[name],
            isError: validateError
          }
        }));
        setForm({...form, [name]: value})
      }

      const SubmitHandler = async(event) => {
        event.preventDefault();
        try {
            const res = await axios.post();
          if(res.status===201){
            setForm(defaultForm);
            Toast("Successfully signed up", "success")
            navigate("../login", { replace: true });
          } 
        } catch (error) {
          Toast("Could not signed up, try again later.", "error")
          console.error(error);
        }
      }

      const validateForm = (name, value) => {
        switch (name) {
          case "email":
            return !emailRegex.test(value);
          case "password":
            return !passwordRegex.test(value); 
          case "confirmPassword": 
            return checkPassword !== value;
          default:
            return false;
        }
      };
    
      useEffect(() => {
        let flag = false;
        Object.entries(error).forEach((i) => {
          if (i[1].isError) {
            flag = true;
          }
        });
        setSubmitMode(flag);
      }, [error]);

  return (
    <div className="centered">
        <form className={style.auth_card} onSubmit={(e)=>SubmitHandler(e)}>
            <HeaderText text="Sign up" />
            <div className={style.name_input}>
                <Textbox label="Firstname" name="firstName" type="text" value={form.firstName} onChange={(e)=>handleChange(e)} required/>
                <Textbox label="Lastname" name="lastName" type="text" value={form.lastName} onChange={(e)=>handleChange(e)} required/>
            </div>
            <Textbox label="Email" name="email" type="email" value={form.email} onChange={(e)=>handleChange(e)} error={error.email.isError} required/>
            {error.email.isError && <span className="text-span text-center">{error.email.errorMessage}</span>}
            <div className={style.password_fields}>
                <Textbox label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e)=>handleChange(e)} error={error.password.isError} required/>
                {showPassword ? 
                    <ViewIcon w={8} h={8} color="teal" className={style.eye_icon} onClick={()=>setShowPassword(!showPassword)}/> 
                    : 
                    <ViewOffIcon w={8} h={8} color="teal" className={style.eye_icon} onClick={()=>setShowPassword(!showPassword)}/>
                }
            </div>
            {error.password.isError && <span className="text-span text-center">{error.password.errorMessage}</span>}
            <div className={style.password_fields}>
                <Textbox label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e)=>handleChange(e)} error={error.confirmPassword.isError} required/>
                {showConfirmPassword ? 
                    <ViewIcon w={8} h={8} color="teal" className={style.eye_icon} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/> 
                    : 
                    <ViewOffIcon w={8} h={8} color="teal" className={style.eye_icon} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>
                }
            </div>
            {error.confirmPassword.isError && <span className="text-span text-center">{error.confirmPassword.errorMessage}</span>}
            <Button variant="solid" width='17rem' colorScheme="teal" disabled={submitMode} error={submitMode} type="submit">Sign up</Button>
            <div className={textAuth}>Already have an account? <Link to="/login" className="link"><span className={`text-span ${style.account_check}`}>Login <ChevronRightIcon /></span></Link></div>
        </form>
    </div>
  )
}

export { SignupForm };