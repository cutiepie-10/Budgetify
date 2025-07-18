export async function ResponseToJSON(response:Response,err:string):Promise<any>{
    if(!response.ok){
        throw new Error(err);
    }
    return response.json();
}