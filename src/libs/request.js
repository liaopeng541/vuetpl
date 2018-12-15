/**
 * Created by liaopeng on 17/3/4.
 */
'use strict'
import querystring from 'query-string';
let request={}
 request.get=(url,params,overtime=0)=>{
     let map={
         method: 'GET',
         // mode:'no-cors',
         // credentials:'include',
         headers: {
             'Accept':'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
           //  'Content-Type':'application/json'
         },
     }
    if(params)
    {

        let opera='';
        url.indexOf("?")>0?opera='&':opera="?";
        url +=opera+querystring.stringify(params);

    }
    return Promise.race([
        fetch(url,map),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('访问超时，请重试')), overtime>0 ? overtime*1000 : 30 * 1000);
        })
    ]).then((response)=>{return response.json()})
    // return fetch(url,map)
    //     .then((response)=>response.json())
}
request.post=(url,body,overtime=0)=>{
    let map={
        method: 'POST',
        // mode:'no-cors',
        // credentials:'include',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          //  'Content-Type':'application/json'
        },
        body: querystring.stringify(body)
    }
    return Promise.race([
        fetch(url,map),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('request timeout')), overtime>0 ? overtime*1000 : 30 * 1000);
        })
    ]).then((response)=>{
       // console.log(response);
        return response.json()})
    // return fetch(url,map).
    // then((response)=>response.json())
}
export default request