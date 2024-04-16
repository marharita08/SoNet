import {useState} from "react";

export const useCropper = () => {

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

  const addImage = (file, onError) => {
    if (file.type.match("image.*") && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      onError("Wrong file format or size!");
    }
  };

  const cropImage = (onResult) => {
    if (typeof cropper !== "undefined") {
      let img = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(img);
      setImage(null);
      fetch(img)
        .then(res => res.blob())
        .then(blob => {
          onResult(blob);
        });
    }
  };

  const deleteImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  return {image, croppedImage, setCropper, addImage, cropImage, deleteImage}
}
