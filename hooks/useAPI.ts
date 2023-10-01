'use client';

import { useState } from 'react';
import Axios from 'axios';

function useAPI(){
    const [responseData,setResponseData] = useState(null);
    const [error,setError] = useState(null);
    const [isSuccess,setSuccess] = useState(false);
    const [isCompleted,setCompleted] = useState(true);

    const sendGetRequest = (url : string,headers : any,queryParams : any) => {
        setCompleted(false);
        const queryString = typeof queryParams === 'object'? Object.keys(queryParams)
                                    .map(key => key + '=' + queryParams[key])
                                    .join('&') : '';

        let fullUrl = url ;
        if(queryString){
            fullUrl = url + '?' + queryString ;
        }

        Axios.get(fullUrl,{
            headers:headers
        }).then(res=>{
            setError(null);
            setResponseData(res?.data);
            setCompleted(true);
            setSuccess(true);
        }).catch(err => {
            setError(err);
            setResponseData(null);
            setCompleted(true);
            setSuccess(false);
        });
    }

    const sendPOSTRequest = (url : string,headers : any,queryParams : any,body : any) => {
        setCompleted(false);
        const queryString = typeof queryParams === 'object'? Object.keys(queryParams)
                                    .map(key => key + '=' + queryParams[key])
                                    .join('&') : '';

        let fullUrl = url ;
        if(queryString){
            fullUrl = url + '?' + queryString ;
        }

        Axios.post(fullUrl, body, {
            headers: headers
        })
        .then(res=>{
            setError(null);
            setResponseData(res?.data);
            setCompleted(true);
            setSuccess(true);
        }).catch(err => {
            setError(err);
            setResponseData(null);
            setCompleted(true);
            setSuccess(false);
        });
    }

    return {responseData , isCompleted, error, isSuccess, sendGetRequest, sendPOSTRequest } ;
}

export default useAPI ;