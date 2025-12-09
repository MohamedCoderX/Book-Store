export const getBaseUrl=()=>{
    if(process.env.NODE_ENV==='production'){
        return 'https://www.yourproductiondomain.com';
    }
    else{
        return 'http://localhost:3001';
    }
}

