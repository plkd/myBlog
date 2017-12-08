export default {
  token: isLoggedIn() || null,
  progress: 0,
  headline: ''
}

function isLoggedIn() {
  let token = localStorage.getItem('jwt');
  if (token) {
    const payload = JSON.parse(window.btoa(token.split('.')[1]));
    if (payload.exp>Date.now()/1000){
      return token;
    }
  }else {
    return false;
  }
}
