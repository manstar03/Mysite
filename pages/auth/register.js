const siteTitle = "User Register | Best Job site !";

import Layout from "../../components/layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import utilstyles from "./../../styles/utils.module.css";
import MailForm from "../../components/accountForm/mailForm";
import PhoneForm from "../../components/accountForm/phoneForm";
import VerifyForm from "../../components/accountForm/verifyForm";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Register({}){
    const router = useRouter();
    const [formOrder,setFormOrder] = useState(1);
    const [userinfo,setUserinfo] = useState({});
    const [verifycode,setVerifycode] = useState("000000");
    const [userid , setUserid] = useState(0);
    const [updateNavbar,setUpdateNavber] = useState(0);
    useEffect(()=>{
        if ( userid != 0 ){
            setUpdateNavber(userid);
            router.push("/auth/login");
        }
    });
    return (
        <Layout updateNavbar = {updateNavbar}>
            <Head>
                <title>
                    {siteTitle}
                </title>
            </Head>
            <div className = {`container ${utilstyles.mainForm}`}>
                <div className={`card ${utilstyles.mT100}`}>
                    <Image
                        priority
                        src={`/slider/form.png`}
                        className={utilstyles.formbackground}
                        width = "100"
                        height = "100"
                        alt = "image"
                    />
                    <h4 className="card-header">Register</h4>
                    <div className="card-body row">
                        <div className = "col-md-8">
                            {formOrder==1 && <MailForm handleData = {setFormOrder} setUserinfo = {setUserinfo} />}
                            {formOrder==2 && <PhoneForm handleData = {setFormOrder} setverify = {setVerifycode} userinfo = {userinfo} addUserinfo={setUserinfo} />}
                            {formOrder==3 && <VerifyForm handleData = {setFormOrder} verifycode = {verifycode} userinfo = {userinfo} setUserid = {setUserid} />}
                        </div>
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
