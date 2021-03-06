import "./App.scss";
import FileUpload from "./file-upload.component";
import React, { useState, useEffect } from "react";

function App() {
    const [caption, setCaption] = useState("Caption Will Appear Here");

    const [photo, setPhoto] = useState();

    const handleSubmit = () => {
        const formData = new FormData();
        if (photo) {
            formData.append("fileUploaded", photo[0]);
            console.log(photo);
            fetch("https://38a7-223-235-230-123.ngrok.io/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    setCaption(result.caption);
                    console.log("Success:", result);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    useEffect(() => {
        handleSubmit();
    }, [photo]);

    return (
        <div className='App'>
            <header className='App-header'>
                <h1 className='logo'>ooglar!</h1>
                <div className='preview'>
                    {photo && (
                        <img
                            className='pre'
                            src={URL.createObjectURL(photo[0])}
                            alt={`file preview`}
                        />
                    )}
                </div>
                <div className='caption'>
                    {/* Insert Caption Here */}
                    {/* <h4>two dogs are playing in green grass</h4> */}
                    {/* <h4>yellow bus in grey road</h4> */}
                    {/* <h4>a woman in black dress playing tennis</h4> */}

                    {/* <h4>two dogs are playing in green grass</h4> */}
                </div>
                <form onSubmit={handleSubmit} className='form-con'>
                    <FileUpload
                        multiple
                        accept='.jpg,.png,.jpeg'
                        updateFilesCb={setPhoto}
                    />
                </form>
            </header>
        </div>
    );
}

export default App;
