import "./createPage.css";
import Image from "../../components/Image/image";

const CreatePage = () => {
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <div className="upload">
          <div className="uploadTitle">
            <Image path={"/general/upload.svg"} alt={""} />
            <span>Choose a file</span>
          </div>
          <div className="uploadInfo">
            We recommend useng high quility .jpg files
          </div>
        </div>
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
            <input type="link" placeholder="Add a link" name="link" id="link" />
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
    </div>
  );
};

export default CreatePage;
