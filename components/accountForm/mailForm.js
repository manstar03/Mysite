import { useState } from "react";
import FormStyles from "./css/forms.module.css";
import Link from "next/link";
import axios from "axios";

export default function MailForm(props){
    const [bflag,setBflag] = useState(false);
    const [errors,setErrors] = useState({});
    const [fullname,setFullname] = useState("");
    const [surname,setSurname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [privacy,setPrivacy] = useState(false);
    const validate = async () => {
        await setErrors({});
        const error = {};
        if(fullname == ""){
            error.fullname = "Empty error in Full name";
        }
        if ( surname == ""){
            error.surname = "Empty error in Sur name";
        }
        if ( username == ""){
            error.username = 'Empty error in User name';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)){
            error.username = 'Invalid email address';
        }
        if ( password == "" ){
            error.password = "Empty error in Password ";
        } else if (password.length < 6){
            error.password = "Length Error in Password (Over six letters)"
        }
        if ( password != confirm ){
            error.confirm = "Not same Error between Password and Confirm"
        }
        return error;
    }
    const submitForm = async (e) =>{
        setBflag(true);
        if(privacy == false){ 
            alert("You have to agree with our privacy policy.");
            setBflag(false);
            return ;
        }
        const error = await validate();
        if ( Object.keys(error).length > 0 ){
            setErrors(error); 
            setBflag(false);
            return ;
        }
        axios.post('http://localhost:8000/check_email',{
            "email" : username
        }).then(async (response)=>{
            if ( response.data.message == "exist" ){ 
                setErrors({username:"Aleray exist email."});
                setBflag(false);
                return ;
            }
            const JsonData = {};
            await axios.get("https://api.db-ip.com/v2/free/self").then((res)=>{
                JsonData.city = res.data.city;
                JsonData.stateProv = res.data.stateProv;
                JsonData.country = res.data.countryName;
                JsonData.ipAddress = res.data.ipAddress;
                JsonData.fullname = fullname;
                JsonData.surname = surname;
                JsonData.email = username;
                JsonData.password = password;
                props.setUserinfo(JsonData);
                setBflag(false);
                props.handleData(2);
            })
        })
    }
    var onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name){
            case "fullname":
                setFullname(value); break;
            case "surname":
                setSurname(value); break;
            case "username":
                setUsername(value); break ;
            case "password":
                setPassword(value); break ;
            case "confirm":
                setConfirm(value); break ;
            case "privacy":
                setPrivacy(!privacy); break ;
            default :
                break;
        } 
    }
    return (
        <form className = {FormStyles.form_Fontfamily}>
            <div className="form-group row">
                <div className = "col-md-6">
                    <label className={FormStyles.form_fontLabel}>Full name</label>
                    <input name="fullname" type="text" value = {fullname} onChange = {onChangeInput} className={`${FormStyles.form_input} form-control ${errors.fullname ? 'is-invalid' : ''}`} />
                    {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                </div>
                <div className = "col-md-6">
                    <label className={FormStyles.form_fontLabel}>Sur name</label>
                    <input name="surname" type="text" value = {surname} onChange={onChangeInput} className={`${FormStyles.form_input} form-control ${errors.surname ? 'is-invalid' : ''}`} />
                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                </div>
            </div><br/>
            <div className="form-group">
                <label className={FormStyles.form_fontLabel}>User name</label>
                <input name="username" type="email" value = {username} onChange={onChangeInput} className={`${FormStyles.form_input} form-control ${errors.username ? 'is-invalid' : ''}`} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="miracleweb2000@gmail.com"/>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div><br/>
            <div className="form-group row">
                <div className="col-md-6">
                    <label className={FormStyles.form_fontLabel}>Password</label>
                    <input name="password" type="password" value = {password} onChange={onChangeInput} className={`${FormStyles.form_input} form-control ${errors.password ? 'is-invalid' : ''}`} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="col-md-6">
                    <label className={FormStyles.form_fontLabel}>Confirm</label>
                    <input name="confirm" type="password" value = {confirm} onChange = {onChangeInput} className={`${FormStyles.form_input} form-control ${errors.confirm ? 'is-invalid' : ''}`} />
                    {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
                </div>
            </div><br/>
            <div className="form-group">
                <p>The password must be at least eight characters long and include <b className={FormStyles.form_fontLabel}>letters</b>, <b className={FormStyles.form_fontLabel}>numbers</b> and <b className={FormStyles.form_fontLabel}>special characters</b></p>
                <input name = "privacy" type="checkbox" value = {privacy} onChange={onChangeInput} className={`${FormStyles.cursorPointer} ${errors.privacy}`}></input>
                <label className={FormStyles.m_left20}>Do you agree with our privacy Policy?</label>
            </div><br/>
            <div className="form-group row">
                <div className="col-md-12">
                    <button type = "button" onClick={submitForm} className={`btn btn-primary ${FormStyles.btnSize}`}>
                        {bflag && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                </div>
            </div><br/>
            <div className="form-group">
                <p>Do you already have an account? Please &nbsp;<Link href = "/auth/login"><b>Login Now</b></Link></p>
            </div>
        </form>
    );
}