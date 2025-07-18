import type {User} from "@/models/User"
export function UserReducer(state:User,action:{type:string,
    user:User,
}){
    switch(action.type){
        case "user/loggedin":{
            const user:User={
                ...state,
                first_name:action.user.first_name,
                last_name:action.user.last_name,
                email:action.user.email,
            };
            sessionStorage.setItem("user",JSON.stringify(user));
            return user;
        }
        case "user/update":
        {
            const user:User={
                ...state,
                first_name:action.user.first_name,
                last_name:action.user.last_name,
                email:action.user.email,
            };
            sessionStorage.setItem("user",JSON.stringify(user));
            return user;
        }
        case "user/refresh":
        {
            return action.user;
        }
        case "user/logout":
            {
                const user:User={
                first_name:null,
                last_name:null,
                email:null,
            };
            sessionStorage.setItem("user",JSON.stringify(user));
            return user;
            }
        default:{
            throw new Error("invalid type of action");
        }
    }
}