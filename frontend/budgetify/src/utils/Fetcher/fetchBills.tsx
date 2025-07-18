import { ResponseToJSON } from "../response";
import { getCredentials } from "./Credentials";
import type {Bill} from '@/models/Bill';

export async function getBillsByExpenditureId(expenditureId:string):Promise<Bill[]|null>{
    const {token} = getCredentials();
    let bill =fetch(`http://localhost:8080/auth/bill/${expenditureId}`,{
        method:"GET",
        cache:"force-cache",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        mode:'cors',
    })
    .then((response)=>{
        return ResponseToJSON(response,'error getting bills')
    })
    .then((result)=>{
        console.log(result);
        const {bills} = result;
        return bills;
    })
    .catch((err)=>{
        console.error(err);
    });
    return bill;
}
export async function postBill(bill:Bill):Promise<string>{
    const {token} = getCredentials();
    const url= 'https://localhost:8080/auth/bill/';
    const opts:RequestInit={
        method:'POST',
        body:JSON.stringify(bill),
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        mode:'cors',
    };
    const id:Promise<string>= fetch(url,opts)
    .then((response)=>{
        if(!response.ok){
            throw new Error("error occured while posting the bills");
        }
        return response.json();
    }).
    then((result)=>{
        const{bill_id}= result;
        return bill_id;
    }).
    catch((err)=>{
        console.error(err);
    });
    return id;
}
export async function updateBill(bill:Bill){
    const {token} = getCredentials();
    const url= 'https://localhost:8080/auth/bill/';
    const opts:RequestInit={
        method:'PUT',
        body:JSON.stringify(bill),
        cache:'no-store',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        mode:'cors',
    };
    fetch(url,opts)
    .then((response)=>{
        if(!response.ok){
            throw new Error("error updating the bill");
        }
    })
    .catch((err)=>{
        console.error(err);
    })
}