import React from "react";

export default function Form({
  handlePost,
  setContent,
  handleCancel,
  content,
}) {
  return (
    <>
      <div className="input-group">
        <textarea
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="form-control rounded-corner"
          placeholder="How about your feelings ?"
          name="message"
          value={content}
        />
      </div>
      <br />
      <div onClick={handleCancel} className=" button-submit">
        <button
          className="btn btn-light"
          style={{ marginRight: "10px" }}
          type="submit"
        >
          Cancel
        </button>
        <button onClick={handlePost} className="btn btn-success" type="submit">
          Post
        </button>
      </div>
    </>
  );
}
