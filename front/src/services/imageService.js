const addImage = (file, setImage, errorMessage, setErrorMessage) => {
    if (file.type.match("image.*") && file.size < 10000000) {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        if (errorMessage) {
            setErrorMessage("");
        }
    } else {
        setErrorMessage("Wrong file format or size!");
    }
}

const cropImage = (cropper, setCroppedImage, setImage, setFieldValue) => {
    if (typeof cropper !== "undefined") {
        let img = cropper.getCroppedCanvas().toDataURL();
        setCroppedImage(img);
        setImage(null);
        fetch(img)
            .then(res => res.blob())
            .then(blob => {
                setFieldValue("file", blob);
            });
    }
}

const deleteImage = (setImage, setCroppedImage, setFieldValue) => {
    setImage(null);
    setCroppedImage(null);
    setFieldValue("file", undefined);
}

export default {
    addImage,
    cropImage,
    deleteImage
}
