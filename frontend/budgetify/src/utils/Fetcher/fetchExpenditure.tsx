import { ResponseToJSON } from '../response';
import {getCredentials} from './Credentials';
import type { Expenditure } from '@/models/Expenditure';


export async function getExpenditures():Promise<Expenditure[]>{
    const {token} = getCredentials();
    const url = 'https://localhost:8080/auth/category/';
    const opts:RequestInit = {
        method:"GET",
        mode:'cors',
        cache:'force-cache',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
    };
    const expenditures:Promise<Expenditure[]> = fetch(url,opts)
    .then((response)=>{
        return ResponseToJSON(response,"error fetching the expenditure");
    })
    .then((result)=>{
        const{categories}= result;
        console.log(categories);
        return categories;
    })
    .catch((err)=>{
        console.error(err);
    });
    return expenditures;
}
export async function getExpenditureById(id:string):Promise<Expenditure>{
    const {token} = getCredentials();
    const url= `https://localhost:8080/auth/category/${id}`;
    const opts:RequestInit= {
        mode:'cors',
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        cache:'no-store',
    };
    const expenditures:Promise<Expenditure>= fetch(url,opts)
    .then((response)=>{return ResponseToJSON(response,"error fetching the expenditure")})
    .then((result)=>{
        const {category}= result;
        return category;
    })
    .catch((err)=>{
        console.error(err);
    });
    return expenditures;
}
export async function postExpenditure(expenditure:Expenditure):Promise<string>{
    const {token} = getCredentials();
    const url= 'https://localhost:8080/auth/category/add';
    const opts:RequestInit={
        mode:'cors',
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authoriztion':`Bearer ${token}`,
        },
        body:JSON.stringify(expenditure),
    };
    const id:Promise<string>= fetch(url,opts)
    .then((response)=>{return ResponseToJSON(response,'error posting the expenditure')})
    .then((result)=>{
        const{category_id} = result;
        return category_id;
    })
    .catch((err)=>{
        console.error(err);
    });
    return id;
}
export async function updateExpenditure(expenditure:Expenditure){
    const {token} = getCredentials();
    const url= 'https://localhost:8080/auth/category';
    const opts:RequestInit={
        mode:'cors',
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authoriztion':`Bearer ${token}`,
        },
        body:JSON.stringify(expenditure),
    };
    fetch(url,opts)
    .then((response)=>{
        ResponseToJSON(response,'error updating the expenditure');
    })
    .catch((err)=>{
        console.error(err);
    })
}