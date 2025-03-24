import "./createPage.css";
import Image from "../../components/Image/image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Editor from "../../components/editor/editor";

const CreatePage = () => {
  const { currentUser } = useAuthStore();

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  const previewImgUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? (
        <Editor />
      ) : (
        <div className="createBottom">
          {previewImgUrl ? (
            <div className="preview">
              <img src={previewImgUrl} alt="" />
              <div className="editIcon" onClick={() => setIsEditing(true)}>
                <Image path={"/general/edit.svg"} alt={""} />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <Image path={"/general/upload.svg"} alt={""} />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend useng high quility .jpg files
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          <form className="createForm">
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                type="description"
                placeholder="Add a detailed description"
                name="description"
                id="description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="link"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option> Chose a board</option>
                <option value={"1"}>Board 1</option>
                <option value={"2"}>Board 2</option>
                <option value={"3"}>Board 3</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tag" name="tags" id="tags" />
              <small>Dont worry, people wont see youe tags</small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
