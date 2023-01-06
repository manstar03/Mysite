import { useEffect, useState } from "react";
import FormStyles from "./css/forms.module.css";
import ReactFlagsSelect from "react-flags-select";
import Link from "next/link";
import axios from "axios";
const CountryCodes = require('country-code-info');
const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export default function PhoneForm(props){
    const [selected, setSelected] = useState(0);
    const [countries,setCountries] = useState(0);
    const [bflag,setBflag] = useState(false);
    const [errors,setErrors] = useState({});
    const [phonenumber,setPhonenumber] = useState("");
    const validate = async () => {
        setErrors({});
        const error = {};
        if ( phonenumber == ""){
            error.phonenumber = 'Empty error in phone number';
        } else if (!regex.test(phonenumber)){
            error.phonenumber = 'Invalid phone number';
        }
        return error;
    }
    const backForm = async (e) => {
        props.handleData(1);
    }
    const submitForm = async (e) =>{
        setBflag(true);
        const error = await validate();
        if ( Object.keys(error).length > 0 ){
            setErrors(error);
            setBflag(false);
            return ;
        }
        axios.get('http://localhost:8000/verify_phone',{
            "phonenumber" : phonenumber
        }).then((response)=>{
            if ( response.data.message != "ok" ){ setErrors({"phonenumber":"Already used phone number"});return ;}
            props.addUserinfo({...props.userinfo,  phonenumber: phonenumber});
            props.setverify(response.data.verifycode);
            props.handleData(3);
        })
    }
    const onChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        switch (name){
            case "phonenumber":
                setPhonenumber(value); break;
            default :
                break;
        } 
    }
    useEffect(() => {
        const res = CountryCodes.findCountry({'name':selected});
    })

    return (
        <form className = {FormStyles.form_Fontfamily}>
            <h2>Verify phone number</h2><br/>
            <h6>For security reasons, we need to make sure it's really you. We will send you an SMS with a 6-digit verification code.</h6><br/>
            <div className="form-group row">
                <div className = "col-md-4 col-sm-6">
                    <label></label>
                    <ReactFlagsSelect
                        countries={countries}
                        selected={selected}
                        onSelect = {(code) => setSelected(code)}
                    />
                    {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                </div>
                <div className = "col-md-8 col-sm-6">
                    <label className={FormStyles.form_fontLabel}>Phone num</label>
                    <input name="phonenumber" type="text" min="0" value = {phonenumber} onChange={onChangeInput} className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`} placeholder="+1 2347424610" />
                    {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
                </div>
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
                        Futher
                    </button>
                </div>
            </div><br/>
            <div className="form-group">
                <p>Do you already have an account? &nbsp;<Link href = "/auth/login"><b>Login Now</b></Link></p>
            </div>
        </form>
    );
}