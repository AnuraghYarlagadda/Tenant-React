import CircularProgressWithLabel from "../ui/CircularProgressWithLabel";
import React, { useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import {
  uploadFile,
  getDownloadURL,
  deleteFile,
  listFiles,
} from "../../store/actions/fileActions";

const FileUtils = ({ uploadFile, getDownloadURL, deleteFile, listFiles }) => {
  const [loading, setLoading] = useState(null);
  const [progress, setProgress] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setProgress(0);
      setLoading(true);
      const res = await uploadFile(acceptedFiles[0], setProgress, setLoading);
      console.log(res);
    } else {
      alert("Select only a single file");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="row">
      <div className="col-lg-6 text-center mt-3">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag a file here, or click to select file</p>
          )}
        </div>
        <hr className="bg-dark" />
        <Fragment>
          {loading && <CircularProgressWithLabel value={progress} />}
        </Fragment>
        <Fragment>
          <button
            onClick={async () => {
              const res = await getDownloadURL();
              setDownloadUrl(res);
            }}
          >
            get DownloadURL
          </button>
        </Fragment>
        <Fragment>
          {" "}
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <button>
                <i className="fas fa-download" />
                Download File
              </button>
            </a>
          )}
        </Fragment>
        <Fragment>
          <button
            onClick={async () => {
              const res = await deleteFile();
              console.log(res);
            }}
          >
            Delete File
          </button>
        </Fragment>
        <Fragment>
          <button
            onClick={async () => {
              const res = await listFiles();
              console.log(res);
            }}
          >
            List Files
          </button>
        </Fragment>
      </div>
    </div>
  );
};

export default connect(null, {
  uploadFile,
  getDownloadURL,
  deleteFile,
  listFiles,
})(FileUtils);
