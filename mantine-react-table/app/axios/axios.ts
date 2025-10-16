import axios from "axios";

export const customQuery ={
    queryKey: ['mydata'],
    queryFn: fetchData,
    
}

async function fetchData() {
    const response = await axios.get("https://api.imgflip.com/get_memes");
    console.log(response.data);
    return response.data;
}