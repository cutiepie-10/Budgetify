export function saveCredentials(token:string, refresh_token:string){
    localStorage.setItem("token",token);
    localStorage.setItem("refresh_token",refresh_token);
}
export function getCredentials():{token:string|null,refresh_token:string|null}{
    const tokens={
        token:localStorage.getItem("token"),
        refresh_token:localStorage.getItem("refresh_token"),
    }
    return tokens;
}