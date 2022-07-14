const logOut=()=>{
 var confirm=window.confirm("Are you sure you want to logOut?")
 if(confirm===true){
    localStorage.removeItem('token')
    window.location='/login'
 }
}


export default logOut