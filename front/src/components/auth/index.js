import React from "react";
import { GoogleLogin } from 'react-google-login';
import {useMutation} from "react-query";
import {googleAuth} from "../../containers/api/auth";


export function Auth() {

    const { mutate } = useMutation(
        googleAuth, {
            onSuccess: data => {
                console.log(data);
                alert(data.data)
            },
            onError: data => {
                console.log(data);
                alert("Auth was failed.");
            }
        });

    const onGoogleSuccess = (response) => {
        console.log(response);
        const token = response.tokenObj;
        let data = {'token': token};
        mutate(data);
    }
    const onGoogleFailure = (response) => {
        console.log(response);
        alert("Google auth was failed");
    }


    return (
        <div align={"center"}>
            <GoogleLogin
                clientId="28506691551-d7lij84ucq5d2be1o3b7q1rrseb8evsn.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                className="google-login-button"
                accessType="offline"
            />
        </div>
    )
}
