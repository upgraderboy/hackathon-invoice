import Api from "@/config/baseUrl";


export const getProducts = async ()=>{
  return (await Api.get("/")).data;
}
