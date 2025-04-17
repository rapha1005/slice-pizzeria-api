


function parseJwt(token) {

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }


function isTokenInvalid(token){
    const decoded = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (!decoded || !decoded.exp || decoded.exp < currentTime) return true;
}


function checkAuth(){
    const access_token = localStorage.getItem('access_token')
    if (!access_token || isTokenInvalid(access_token)) {
        
        window.location.href = "/login.html";
}
}


checkAuth()