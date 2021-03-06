import axios from 'axios';
import { saveImageToCloudRequest, saveImageToCloudSuccessful, saveImageToCloudError } from '../actions/saveImageToCloud';

/**
 * @description action controller for uploading recipe image to cloudinary
 *
 * @param {string} image
 *
 * @return {void} action to be dispatch to the store
 */
export default function saveImageToCloud(image) {
  const cloudinaryUrl = process.env.REQUEST;
  const cloudinaryPreset = process.env.CLOUD_PRESET;

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return (dispatch) => {
    dispatch(saveImageToCloudRequest(formData));
    axios.post(cloudinaryUrl, formData)
      .then((res) => {
        const { secure_url } = res.data;
        dispatch(saveImageToCloudSuccessful(secure_url));
      })
      .catch((error) => {
        dispatch(saveImageToCloudError(error));
      });
  };
}
