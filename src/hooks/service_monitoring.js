import { GET_SE, POST_SE } from "./Connection";

export async function list_monitoring(token) {
  let datos = null;

  try {
    datos = await GET_SE("monitoring/list", token);
    console.log("aqui todo bien en listar monitoring");
  } catch (error) {
    console.log("Error en listar_lotes: ", error.response);
    return { code: 500 };
  }
  return datos.data;
}

export async function promedio_calidad_por_dia() {
  let datos = null;

  try {
    datos = await GET_SE("monitoring/promedio/todo");
    console.log("aqui todo bien en listar monitoring");
  } catch (error) {
    console.log("Error en listar_lotes: ", error.response);
    return { code: 500 };
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

export async function modify_monitoring(data, external /*, token*/) {
  let datos = null;
  try {
    datos = await POST_SE("monitoring/modify/" + external, data /*, token*/);
  } catch (error) {
    return error.data;
  }
  return datos.data;
}

export async function extrapolate_data_aire(data) {
  let response = null;
  try {
    response = await POST_SE("/monitoring/extrapolar/aire", data);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  return response.data;
}

export async function extrapolate_data_agua(data) {
  let response = null;
  try {
    response = await POST_SE("/monitoring/extrapolar/agua", data);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  return response.data;
}
