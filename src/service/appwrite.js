import { Appwrite } from "appwrite";
import { v4 as uuidv4 } from "uuid";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint(process.env.REACT_APP_ENDPOINT)
      .setProject(process.env.REACT_APP_PROJECT_ID);
    api.sdk = appwrite;
    return appwrite;
  },
  loginWithGoogle: async () => {
    try {
      const resp = await api
        .provider()
        .account.createOAuth2Session(
          "google",
          "http://localhost:3000",
          "http://localhost:3000/login",
          ["https://www.googleapis.com/auth/userinfo.profile"]
        );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  },
  getAccount: () => {
    return api.provider().account.get();
  },
  logOut: async () => {
    return await api
      .provider()
      .account.deleteSession("current")
      .then((response) => {
        localStorage.removeItem("auth_state");
        window.location = "http://localhost:3000/login";
        console.log(response);
      })
      .catch(console.log);
  },
  savePaste: async (userId, paste) => {
    let shortCode = "";
    shortCode = userId.slice(4, 7) + uuidv4().slice(0, 3);
    console.log(process.env.REACT_APP_COLLECTION_ID);
    try {
      let response = await api.provider().database.createDocument(
        process.env.REACT_APP_COLLECTION_ID,
        {
          userId,
          paste,
          shortCode,
        },
        ["*"],
        ["*"]
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getPaste: async (shortCode) => {
    try {
      let response = await api
        .provider()
        .database.listDocuments(process.env.REACT_APP_COLLECTION_ID, [
          `shortCode=${shortCode}`,
        ]);
      console.log(response);
      return response.sum ? response.documents[0] : null;
    } catch (e) {
      console.log(e);
    }
  },
};

export default api;
