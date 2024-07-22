import { POST } from "./Connection";
import { GET } from "./Connection";

export async function authPerson(data) {

  let datos = null;

  try {

    datos = await POST("login", data);

  } catch (error) {
    return error.response.data;
  }

  return datos.data;

}

export async function validarToken(token) {

  let datos = null;

  try {

    datos = await GET("validar", token);

  } catch (error) {
    return error.response.data;
  }

  return datos.data;

}
