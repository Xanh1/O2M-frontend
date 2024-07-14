import {GET, POST} from "./Connection";
import Cookies from "js-cookie";

export async function list_persons(token) {
    let datos = null;
    try{
        datos = await GET('person', token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function save_person(data, token) {
    let datos = null;
    try {
        datos = await POST("person/save", data, token);
        
    } catch (error) {
        return error;

    }
    return datos.data;
}

export async function search_person(external, token){
    let datos = null;
    try{
        datos = await GET('person/search/uid/'+external, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}



export async function modify_person(data, token){
    let datos = null;
    try{
        datos = await POST('/person/modify', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function modify_person_email(data, token){
    let datos = null;
    try{
        datos = await POST('/person/modify/email', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}

export async function modify_status(data, token){
    let datos = null;
    try{
        datos = await POST('/person/change_state', data, token);
    }
    catch(error){
        return error;
    }
    return datos.data
}