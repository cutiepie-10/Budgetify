import type {User} from "@/models/User"
export function UserReducer(state:User,action:{type:string,
    user:User|null,
}){
    switch(action.type){
        case "user/loggedin":{
            return{
                ...state,
                first_name:action.user.first_name,
                last_name:action.user.last_name,
                email:action.user.email,
            };
        }
        case "user/update":
        {
                return{
                ...state,
                first_name:action.user.first_name,
                last_name:action.user.last_name,
                email:action.user.email,
            };
        }
        case "user/logout":
            {
                return{
                    first_name:null,
                    last_name:null,
                    email:null,
                };
            }
        default:{
            throw new Error("invalid type action");
        }
    }
}