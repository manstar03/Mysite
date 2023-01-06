const siteTitle = "User Login | Best Job site !";

import Layout from "../../components/layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import utilstyles from "./../../styles/utils.module.css";
import LoginForm from "./../../components/accountForm/loginForm";
import ForgotForm from "./../../components/accountForm/forgotForm";
import Image from "next/image";
import Router from "next/router";

export default function Login({}){
    const [formOrder,setFormOrder] = useState(1);
    const [updateNavbar,setUpdateNavber] = useState(0);
    useEffect(()=>{
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
                    <h4 className="card-header">Login</h4>
                    <div className="card-body row">
                        <div className = "col-md-8">
                            {formOrder==1 && <LoginForm setFormOrder = {setFormOrder} />}
                            {formOrder==2 && <ForgotForm />}
                        </div>
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
