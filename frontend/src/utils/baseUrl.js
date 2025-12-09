export const getBaseUrl=()=>{
    if(process.env.NODE_ENV==='production'){
        return 'https://book-store-bk5a.vercel.app';
    }
    else{
        return 'http://localhost:3001';
    }
}

