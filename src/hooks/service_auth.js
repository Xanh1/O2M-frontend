import { POST } from "./Connection";

export async function authPerson(data) {

  let datos = null;

  try {

    datos = await POST("login", data);

  } catch (error) {
    return error.response.data;
  }

  return datos.data;

}
