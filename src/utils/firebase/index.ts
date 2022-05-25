import admin, { credential } from 'firebase-admin';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { logger } from 'firebase-functions';

try {
  // eslint-disable-next-line global-require
  const serviceAccountCredentials: ServiceAccount = require('../../../.serviceaccount.json');

  initializeApp({
    credential: credential.cert(serviceAccountCredentials),
  });
} catch (ex) {
  logger.warn('Error on importing service account, this application can only access locally resources', ex);

  initializeApp({});
}

const db = getFirestore();

const authentication = getAuth();

export default admin;

export { db, authentication as auth };
