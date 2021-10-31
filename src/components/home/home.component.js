import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../context/user.provider";
import appwrite from "./../../service/appwrite";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const { logOut, savePaste } = appwrite;
  const [paste, setPaste] = useState("");
  const [pasteLink, setPasteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const onInputChange = (e) => {
    setPaste(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let result = await savePaste(user.$id, paste);
    let url = `${window.location.href}${result.shortCode}${
      result.secureCode ? `?secure=${result.secureCode}` : ""
    }`;
    setPasteLink(url);
    setCopied(false);
  };

  return (
    <div className="home">
      <header>
        {/* <img src={user?.image} alt="User" /> */}
        <p>Welcome, {user?.name}</p>
        <button onClick={logOut}>SIGN OUT</button>
      </header>
      <div className="container">
        <section className="addPaste">
          <h3>Add New Paste</h3>
          <textarea value={paste} onChange={onInputChange} />
          <button onClick={onSubmit}>Save Paste</button>

          {pasteLink && (
            <Fragment>
              <CopyToClipboard text={pasteLink} onCopy={() => setCopied(true)}>
                <p className="link">{pasteLink}</p>
              </CopyToClipboard>
              <span>
                {copied ? "Copied" : "Click the link to copy to clipboard"}
              </span>
            </Fragment>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
