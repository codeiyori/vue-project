const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  const { email } = data;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    return { message: `Success! ${email} has been made an admin!!` };
  } catch (err) {
    console.error(err);
    throw new functions.https.HttpsError('internal', `An error occurred: ${err.message}`);
  }
});



// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

// exports.addAdminRole = functions.https.onCall((data, context) => {
//     return admin
//         .auth()
//         .getUserByEmail(data.email)
//         .then((user) => {
//         return admin.auth().setCustomUserClaims(user.uid, {
//             admin: true,
//         });
//     })
//     .then(() => {
//         return {
//             message: `Success! ${data.email} has been made an admin!!`,
//         };
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
