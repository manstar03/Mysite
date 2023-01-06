import { useEffect, useState } from "react";
import FormStyles from "./css/forms.module.css";
import Link from "next/link";
import axios from "axios";

export default function LoginForm(props){
    const [bflag,setBflag] = useState(false);
    const [support,setSupport] = useState(false);
    const [errors,setErrors] = useState({});
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [remember,setRemember] = useState("");

    const validate = async () => {
        setErrors({});
        const error = {};
        if ( username.length == 0 ){
            error.username = 'Empty  in Username';
        }
        if ( password.length == 0 ){
            error.password = "Emply in Password";
        }
        return error;
    }
    const submitForm = async (e) =>{
        setBflag(true);
        const error = await validate();
        if ( Object.keys(error).length > 0 ){
            setErrors(error);
            setBflag(false);
            return ;
        }
        axios.post("http://localhost:8000/login",{
            email:username,
            password:password,
        }).then((res) => {
            if( res.data.message == "fail" ){
                alert("There are some errors in login. please try again.");
                setBflag(false);
            } else if ( res.data.message == "noemail" ){
                setErrors({username:"There is no email"});
                setBflag(false);
            } else if ( res.data.message == "nopassword" ){
                setErrors({password: "Incorrect Password"});
                setBflag(false);
            } else if (res.data.message == "noactive"){
                alert("Opss! your account is suspended by our privacy policy. please contact Support team.");
                setSupport(true);
                setBflag(false);
            } else if ( res.data.message == "success" ){
                const data = JSON.parse(res.data.data);
                console.log(data);
            }
        })

    }
    const toForgotForm = async (e) => {
        props.setFormOrder(2);
    }
    const onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name){
            case "username":
                setUsername(value); break;
            case "password":
                setPassword(value); break;
            case "remember":
                setRemember(!remember); break;
            default :
                break;
        } 
    }

    return (
        <form className = {FormStyles.form_Fontfamily}>
            <h2>Use your JOBS Account.</h2><br/>
            <div className="form-group">
                <input name="username" type="email" value = {username} onChange={onChangeInput} className={`${FormStyles.form_input} form-control ${errors.username ? 'is-invalid' : ''}`} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Enter your email"/>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}              
            </div><br/>
            <div className="form-group">
                    <input name="password" type="password" value = {password} onChange={onChangeInput} className={`${FormStyles.form_input} form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter your password" />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div><br/>
            <div className="form-group row">
                <div className="col-md-6">
                    <input name = "remember" type="checkbox" value = {remember} onChange={onChangeInput} className={`${FormStyles.cursorPointer} ${errors.remember}`}></input>
                    <label className={FormStyles.m_left20}>Remember me</label>
                </div>
                <div className="col-md-6">
                    <label onClick={toForgotForm} className={`${FormStyles.btnSize} ${FormStyles.cursorPointer}`}>
                        Forgot Password ?
                    </label>
                </div>
            </div><br/>
            <div className="form-group">
                <button type = "button" onClick={submitForm} className={`btn btn-outline-primary ${FormStyles.btnSize}`}>
                    {bflag && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Log in
                </button>
            </div><br/>
            <div className="form-group">
                <p>If you don't have own account, Please &nbsp;<Link href = "/auth/register"><b>Register Now</b></Link> .</p>
            </div>
            {
                support && <div className="form-group">
                    <label onClick={toForgotForm} className={`${FormStyles.btnSize} ${FormStyles.cursorPointer}`}>
                        Contact Support
                    </label>
                </div>
            }
            
        </form>
    );
}