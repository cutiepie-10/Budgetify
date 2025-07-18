'use client';
import {useState,useEffect} from 'react';

export interface Points{
    x:number,
    y:number,
    id:string,
}
export function useContextMenu(){
    const [visible,setVisible] = useState(false);
    const [coord,setCoord] = useState<Points>({
        x:0,
        y:0,
        id:'',
    }); 
    useEffect(()=>{
        window.addEventListener('keydown',(e)=>{
            if(e.key==='Escape')
                setVisible(false);
        });
        window.addEventListener('click',()=>{
            setVisible(false);
        });
        return ()=>{
            window.removeEventListener('keydown',(e)=>{
            if(e.key==='Escape')
                setVisible(false);
            window.removeEventListener('click',()=>{
                setVisible(false);
            });
        });
        } 
    },[setVisible]);
    return {
        visible,
        setVisible,
        coord,
        setCoord,
    };
}