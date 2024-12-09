import { GET_SE, POST_SE } from "./Connection";

export async function all_Sensor(token) {
  let datos = null;
  try {
    datos = await GET_SE("listSensor", token);
  } catch (error) {
    return { code: 500 };
  }

  return datos.data;
}

export async function save_sensor(data, token) {
  let datos = null;
  try {
    datos = await POST_SE("/saveSensor", data, token);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  return datos.data;
}


export async function change_status(uid, token) {
  let datos = null;
  try {
    datos = await GET_SE("//modify_status_Sensor/"+uid, token);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  return datos.data;
}



export async function all_element(token) {
  let datos = null;
  try {
    datos = await GET_SE("/get/elements", token);
  } catch (error) {
    //console.log(error.response.data);
    return { code: 500 };
  }
  return datos.data;
}

export async function modify_sensor(data, token) {
  let datos = null;
  try {
    datos = await POST_SE("/modifySensor", data, token);
  } catch (error) {
    return error.data;
  }
  return datos.data;
}

export async function get(token, uid) {
  let datos = null;
  try {
    datos = await GET_SE("/search/" + uid, token);
  } catch (error) {
    //console.log(error.response.data);
    return { code: 500 };
  }
  return datos.data;
}
