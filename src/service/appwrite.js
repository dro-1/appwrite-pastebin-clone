import { Appwrite } from "appwrite";

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
          "http://localhost:3001",
          "http://localhost:3001/login",
          ["https://www.googleapis.com/auth/userinfo.profile"]
        );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  },

  //   createAccount: (email, password, name) => {
  //     return api.provider().account.create(email, password, name);
  //   },

  getAccount: () => {
    return api.provider().account.get();
  },
  logOut: async () => {
    return await api
      .provider()
      .account.deleteSession("current")
      .then((response) => {
        localStorage.removeItem("auth_state");
        window.location = "http://localhost:3001/login";
        console.log(response);
      })
      .catch(console.log);
  },
  //   createSession: (email, password) => {
  //     return api.provider().account.createSession(email, password);
  //   },

  //   deleteCurrentSession: () => {
  //     return api.provider().account.deleteSession("current");
  //   },

  //   createDocument: (collectionId, data, read, write) => {
  //     return api
  //       .provider()
  //       .database.createDocument(collectionId, data, read, write);
  //   },

  //   listDocuments: (collectionId) => {
  //     return api.provider().database.listDocuments(collectionId);
  //   },

  //   updateDocument: (collectionId, documentId, data, read, write) => {
  //     return api
  //       .provider()
  //       .database.updateDocument(collectionId, documentId, data, read, write);
  //   },

  //   deleteDocument: (collectionId, documentId) => {
  //     return api.provider().database.deleteDocument(collectionId, documentId);
  //   },
};

export default api;
