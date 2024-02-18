import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {serialize} from "object-to-formdata";

import EditProfileComponent from "../../../components/modals/editProfile/EditProfileComponent";
import {getUniversities} from "../../../api/universitiesCrud";
import {getFieldVisibilities} from "../../../api/visibilitiesCrud";
import {updateUser} from "../../../api/usersCrud";
import {getInterests} from "../../../api/interestsCrud";
import {EditProfileContainerPropTypes} from "./editProfileContainerPropTypes";
import {refetchOff} from "../../../config/refetchOff";
import imageService from "../../../services/imageService";
import handleResponseContext from "../../../context/handleResponseContext";
import {parseStringToDate} from "../../../services/dateParser";

const EditProfileContainer = ({isModalOpen, user, locations, actions}) => {

  const {birthday, ...restUser} = user;
  const parsedBirthday = parseStringToDate(birthday);
  const {setIsModalOpen, setUser, ...componentActions} = actions;
  const {handleError, showErrorAlert} = useContext(handleResponseContext);
  const {isFetching: isUniversitiesFetching, data: universitiesData} = useQuery(
    "universities", getUniversities, {...refetchOff}
  );
  const {isFetching: isVisibilitiesFetching, data: visibilitiesData} = useQuery(
    "visibilities", getFieldVisibilities, {...refetchOff}
  );
  const {isFetching: isInterestsFetching, data: interestsData} = useQuery(
    "interests", getInterests, {...refetchOff}
  )

  let universities = universitiesData?.data;
  let visibilities = visibilitiesData?.data;
  let interests = interestsData?.data;

  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [cropper, setCropper] = useState();

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
    imageService.addImage(e.target.files[0], setImage, showErrorAlert);
  };

  const handleCropImage = (setFieldValue) => {
    imageService.cropImage(cropper, setCroppedImage, setImage, setFieldValue);
  };

  const handleDeleteImage = (setFieldValue) => {
    imageService.deleteImage(setImage, setCroppedImage, setFieldValue);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCroppedImage(null);
    setImage(null);
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
