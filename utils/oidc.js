// oidc.js
import passport from 'passport';
import { 
  OIDC_CLIENT_ID, 
  OIDC_ISSUER, 
  OIDC_CLIENT_SECRET, 
  OIDC_REDIRECT_URI 
} from './config.js';
import {
  Issuer,
  Strategy
} from 'openid-client'

const params = {
  claims: {
    id_token: {
      uid: { essential: true },
    },
    userinfo: {
      hyGroupCn: { essential: true }
    },
  },
};

const getClient = async () => {
  const issuer = await Issuer.discover(OIDC_ISSUER)

  const client = new issuer.Client({
    client_id: OIDC_CLIENT_ID,
    client_secret: OIDC_CLIENT_SECRET,
    redirect_uris: [OIDC_REDIRECT_URI],
    response_types: ['code'],
  })

  return client
}

const verifyLogin = async (_tokenSet, userinfo, done) => {
  const {
    uid: username,
    hyGroupCn: iamGroups,
  } = userinfo


  const user = {
    username:  username,
    iamGroups: iamGroups,
  }

  done(null, user)
}

const setupAuthentication = async () => {
  try {
    
    console.log('Starting OIDC setup...');
    const client = await getClient()
    console.log('Issuer discovered successfully');

    passport.serializeUser((user, done) => {
      const { username, iamGroups } = user
      return done(null, { username, iamGroups })
    })

    passport.use('oidc', new Strategy({ client, params }, verifyLogin))

    console.log('OIDC setup completed successfully');
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    throw error;
  }
};

export default setupAuthentication