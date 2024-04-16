import React, {useContext} from "react";
import {useMutation} from "react-query";
import {serialize} from "object-to-formdata";

import EditProfileComponent from "../../../components/modals/editProfile/EditProfileComponent";
import {getUniversities} from "../../../api/universitiesCrud";
import {getFieldVisibilities} from "../../../api/visibilitiesCrud";
import {updateUser} from "../../../api/usersCrud";
import {getInterests} from "../../../api/interestsCrud";
import {EditProfileContainerPropTypes} from "./editProfileContainerPropTypes";
import handleResponseContext from "../../../context/handleResponseContext";
import {parseStringToDate} from "../../../services/dateParser";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";
import {useCropper} from "../../../hooks/useCropper";

const EditProfileContainer = ({isModalOpen, user, locations, actions}) => {

  const {birthday, interest_names, ...restUser} = user;
  const parsedBirthday = parseStringToDate(birthday);
  const {setIsModalOpen, setUser, ...componentActions} = actions;
  const {handleError, showErrorAlert} = useContext(handleResponseContext);

  let {isFetching: isInterestsFetching, data: interests} = useQueryWrapper("interests", getInterests);
  let {isFetching: isUniversitiesFetching, data:universities} = useQueryWrapper("universities", getUniversities);
  let {isFetching: isVisibilitiesFetching, data: visibilities} = useQueryWrapper("visibilities", getFieldVisibilities);

  const {image, croppedImage, setCropper, addImage, cropImage, deleteImage} = useCropper();

  const {mutate, isLoading} = useMutation(
    updateUser, {
      onSuccess: (data) => {
        setUser(data.data);
        setIsModalOpen(false);
      },
      onError: handleError
    }
  );

  const onFormSubmit = (data) => {
    let formData = serialize(data);
    mutate(formData);
  };

  const handleAddImage = e => {
    e.preventDefault();
    addImage(e.target.files[0], (err) => showErrorAlert(err));
  };

  const handleCropImage = (setFieldValue) => {
    cropImage((result) => setFieldValue("file", result));
  };

  const handleDeleteImage = (setFieldValue) => {
    setFieldValue("file", undefined);
    deleteImage();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    deleteImage();
  };

  const onInterestChange = (e, interests, setFieldValue) => {
    const interest = +e.target.value;
    const getUpdatedInterests = () => {
      if (interests.includes(interest)) {
        return interests.filter((i) => i !== interest);
      } else {
        return [...interests, interest];
      }
    }
    setFieldValue("interests", getUpdatedInterests());
  }

  return (
    <EditProfileComponent
      data={{
        user: {...restUser, birthday: parsedBirthday},
        universities, visibilities, interests, croppedImage, image, locations
      }}
      actions={{
        handleDeleteImage, handleCropImage, onFormSubmit, setCropper,
        handleAddImage, handleModalClose, onInterestChange, ...componentActions
      }}
      flags={{
        isLoading, isModalOpen,
        isFetching: isUniversitiesFetching || isVisibilitiesFetching || isInterestsFetching
      }}
    />
  );
};

EditProfileContainer.propTypes = EditProfileContainerPropTypes;

export default EditProfileContainer;
