import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setuploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]); // first one file from file
        setFilename(e.target.files[0].name);
    };

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                const { fileName, filePath } = res.data;
                setuploadedFile({ fileName, filePath });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    console.log("There was a problem with the server");
                } else {
                    console.log(err.response.data.msg);
                }
            });
    };

    return (
        <div>
            <Fragment>
                <form action="" onSubmit={onSubmit}>
                    <div className="custom-file mb-4">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            onChange={onChange}
                        />
                        <label
                            className="custom-file-label"
                            htmlFor="customFile"
                        >
                            {filename}
                        </label>
                    </div>
                    <input
                        type="submit"
                        value="Upload"
                        className="btn btn-primary btn-block mt-4"
                    />
                </form>
            </Fragment>
        </div>
    );
};

export default FileUpload;
