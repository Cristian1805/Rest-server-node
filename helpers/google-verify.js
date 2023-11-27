const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 


async function googleVerify( token = '') {

  const ticket = await client.verifyIdToken({
      idtoken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
       
  });


  const { name, picture, email, given_name: userName}= ticket.getPayload();

  return {
    nombre: name,
    userName,
    img: picture,
    correo: email
  }
}


module.exports = {
    googleVerify
}