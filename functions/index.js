const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  const { email } = data;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    const userDocRef = admin.firestore().collection('users').doc(user.uid);
    await userDocRef.set({ status: "Admin" }, { merge: true });

    return { message: `Success! ${email} has been made an admin!!` };
  } catch (err) {
    console.error(err);
    throw new functions.https.HttpsError('internal', `An error occurred: ${err.message}`);
  }
});

exports.removeAdminRole = functions.https.onCall(async (data, context) => {
  const { email } = data;

  try {
    const user = await admin.auth().getUserByEmail(email);
    const { customClaims } = await admin.auth().getUser(user.uid);
    if (customClaims.admin === true) {
      await admin.auth().setCustomUserClaims(user.uid, { admin: false });

      const userDocRef = admin.firestore().collection('users').doc(user.uid);
      await userDocRef.set({ status: "User" }, { merge: true });

      return { message: `Success! Admin role has been removed from user ${email}!!` };
    } else {
      throw new Error(`User ${email} is not an admin`);
    }
  } catch (err) {
    console.error(err);
    throw new functions.https.HttpsError('internal', `An error occurred: ${err.message}`);
  }
});

// whenever you add a function please firebase deploy --only functions
