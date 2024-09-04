import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import UploadForm from "./components/UploadForm";

const photos = [
  "https://picsum.photos/id/1001/200/200",
  "https://picsum.photos/id/1002/200/200",
  "https://picsum.photos/id/1003/200/200",
  "https://picsum.photos/id/1004/200/200",
  "https://picsum.photos/id/1005/200/200",
  "https://picsum.photos/id/1006/200/200",
];

function App() {
  const [count, setCount] = useState("");
  const [inputs, setInputs] = useState({ title: null, file: null, path: null });
  const [items, setItems] = useState(photos);
  const [isCollapsed, collapse] = useState(false);

  const toggle = () => collapse(!isCollapsed);
  const handleOnChange = (e) => {
    if (e.target.name === "file") {
      setInputs({
        ...inputs,
        file: e.target.files[0],
        path: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setInputs({ ...inputs, title: e.target.value });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (inputs.title && inputs.title.trim() && inputs.path) {
      setItems([inputs.path, ...items]);
      setInputs({ title: "", file: null, path: null }); // Reset input
    } else {
      console.error("Please fill out the title and upload a file.");
    }
    setInputs({ title: null, file: null, path: null });
    collapse(false);
  };

  useEffect(() => {
    setCount(`you have ${items.length} image${items.length > 1 ? "s" : ""}`);
  }, items);

  return (
    <>
      <Navbar />

      <div className="container text-center mt-5">
        <button className="btn btn-success float-end" onClick={toggle}>
          {isCollapsed ? "close" : "+Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm
          inputs={inputs}
          isVisible={isCollapsed}
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        />
        {count}
        <h1>Gallery</h1>
        <div className="row mt-5">
          {items.map((photo, index) => (
            <Card key={index} src={photo} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
