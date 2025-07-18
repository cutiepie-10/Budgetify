import {ChangeEvent, useState,useEffect} from 'react';
export const Editor= (prop:{
    val?:string|number,
    onChange?:(e:ChangeEvent)=>void,
    onBlur?:(setEdit:(a:boolean)=>void)=>void,
    onDoubleClick?:(setEdit:(a:boolean)=>void)=>void,
    type:string,
})=>{
    const [edit,setEdit] = useState<boolean>(false);
    //Effect for the empty values
    useEffect(()=>{
        if(prop?.val===' '){
        setEdit(true);
        }
    },[setEdit,prop?.val]);
    return(
    <div onDoubleClick={()=>prop?.onDoubleClick(setEdit)}>
         {
            edit?
            <input value={prop.val} onChange={(e)=>{prop?.onChange(e)}} onBlur={()=>{prop?.onBlur(setEdit)}} 
            className="pl-2 overflow-y-auto" type={prop.type}autoFocus/>
            :<p className="min-w-1 cursor-pointer">{prop?.val}</p>
         }
    </div>
    );
};