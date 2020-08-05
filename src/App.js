import { pdf } from "@react-pdf/renderer";
import React from "react";
import { MyDocument } from "./MyDocument";
import axios from "axios";

function App() {
  const send = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    const reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      const d = reader.result.split("data:application/pdf;base64,");
       await axios.post("http://localhost:8080/send", {
        pdf: d[1],
      });
    });
    reader.readAsDataURL(blob);
  };
  return (
    <div>
      <button onClick={send}>Download</button>
    </div>
  );
}

export default App;
