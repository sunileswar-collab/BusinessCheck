import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const loginWithFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerWithFirebase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw new Error(error.message);
  }
};