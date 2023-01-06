import { useEffect, useState } from "react";
import FormStyles from "./css/forms.module.css";
import Link from "next/link";
import axios from "axios";

export default function VerifyForm(props){
    const [bflag,setBflag] = useState(false);
    const [errors,setErrors] = useState({});
    const [verifynum,setVerifynum] = useState("");
    const validate = async () => {
        setErrors({});
        const error = {};
        if ( verifynum.length != 6 ){
            error.verifynum = 'Empty Length in verification code (6 letters)';
        }
        return error;
    }
    const backForm = async (e) => {
        props.handleData(2);
    }
    const submitForm = async (e) =>{
        setBflag(true);
        const error = await validate();
        if ( Object.keys(error).length > 0 ){
            setErrors(error);
            setBflag(false);
            return ;
        }
        if (props.verifycode != verifynum ){
            setErrors({"verifynum": "Incorrect Code"})
            setBflag(false);
            return ;
        }
        await axios.post('http://localhost:8000/save_user',props.userinfo).then((res) => {
            setBflag(false);
            props.setUserid(res.data.id);
        })
    }
    const onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name){
            case "verifynum":
                setVerifynum(value); break;
            default :
                break;
        } 
    }

    return (
        <form className = {FormStyles.form_Fontfamily}>
            <h2>Verification Code</h2><br/>
            <h6>For security reasons, we need to make sure it's really you. We will send you an SMS with a 6-digit verification code.</h6><br/>
            <div className="form-group">
                <label className={FormStyles.form_fontLabel}>Verification code</label>
                <input name="verifynum" type="number" min="0" value = {verifynum} onChange={onChangeInput} className={`form-control ${errors.verifynum ? 'is-invalid' : ''}`}/>
                {errors.verifynum && <div className="invalid-feedback">{errors.verifynum}</div>}
            </div><br/>
            <div className="form-group row">
                <div className="col-md-6">
                    <button type = "button" onClick ={backForm} className={`btn btn-outline-danger ${FormStyles.btnSize}`}>
                        Back
                    </button>
                </div>
                <div className="col-md-6">
                    <button type = "button" onClick={submitForm} className={`btn btn-outline-primary ${FormStyles.btnSize}`}>
                        {bflag && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Verify
                    </button>
                </div>
            </div><br/>
            <div className="form-group">
                <p>Do you already have an account? &nbsp;<Link href = "/auth/login"><b>Login Now</b></Link></p>
            </div>
        </form>
    );
}