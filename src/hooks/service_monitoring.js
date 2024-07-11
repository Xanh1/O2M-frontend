import {GET, POST} from "./Connection";
import Cookies from "js-cookie";



export async function list_monitoring(token) {
    let datos = null;

    try {
        datos = await GET('monitoring/list', token);
        console.log("aqui todo bien en listar monitoring");
    } catch (error) {
        console.log("Error en listar_lotes: ", error.response);
        return { "code": 500 };
    }
    return datos.data;
}

export async function save_monitoring(data, token) {
    let datos = null;

    try {
        datos = await POST("monitoring/save", data, token);
        console.log("######Aqui en service?" + datos);
        
    } catch (error) {
        return error.data;

    }
    return datos.data;
}

export async function modify_monitoring(data, external/*, token*/){
    let datos = null;
    try{
        datos = await POST('monitoring/modify/' + external, data/*, token*/);
    }
    catch(error){
        return error.data;
    }
    return datos.data
}



export async function search_person(external/*, token*/){
    let datos = null;
    try{
        datos = await GET('person/search/uid/'+external/*, token*/);
    }
    catch(error){
        return error.response.data;
    }
    return datos.data
}


