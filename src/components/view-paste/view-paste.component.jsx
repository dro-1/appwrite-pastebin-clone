import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import appwrite from "./../../service/appwrite";
import Loader from "../utils/loader.component";

import "./view-paste.css";

const ViewPaste = (props) => {
  const [copied, setCopied] = useState(false);
  const [paste, setPaste] = useState("");

  const fetchPaste = async () => {
    let shortCode = window.location.pathname.slice(1);

    const { getPaste } = appwrite;

    let response = await getPaste(shortCode);
    if (response) setPaste(response.paste);
  };

  useEffect(() => {
    fetchPaste();
  }, []);

  return !paste ? (
    <Loader />
  ) : (
    <section className="viewPaste">
      <h3>View Paste</h3>
      <textarea value={paste} contentEditable={false} readOnly={true} />
      <CopyToClipboard text={paste} onCopy={() => setCopied(true)}>
        <button>Copy To Clipboard</button>
      </CopyToClipboard>
      <span>{copied && "Copied"}</span>
    </section>
  );
};

export default ViewPaste;
