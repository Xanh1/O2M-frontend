import { GET, POST } from "./Connection";

export async function all_Sensor(token) {
  let datos = null;
  try {
    datos = await GET("listSensor", token);
  } catch (error) {
    return { code: 500 };
  }

  return datos.data;
}

export async function save_sensor(data, token) {
  let datos = null;
  try {
    datos = await POST("/saveSensor", data, token);
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
  return datos.data;
}

export async function all_element(token) {
  let datos = null;
  try {
    datos = await GET("/get/elements", token);
  } catch (error) {
    //console.log(error.response.data);
    return { code: 500 };
  }
  return datos.data;
}

export async function modify_sensor(data, token) {
  let datos = null;
  try {
    datos = await POST("/modifySensor", data, token);
  } catch (error) {
    return error.data;
  }
  return datos.data;
}

export async function get(token, uid) {
  let datos = null;
  try {
    datos = await GET("/search/" + uid, token);
  } catch (error) {
    //console.log(error.response.data);
    return { code: 500 };
  }
  return datos.data;
}
