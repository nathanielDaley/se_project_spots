import {
  settings as validationConfig,
  disableButton,
  enableButton,
} from "../scripts/validation.js";

function _renderLoading(
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit(
  request,
  evt,
  loadingText = "Saving...",
  finallyEnableButton = false
) {
  evt.preventDefault();
  debugger;
  //get the button that submitted the form
  const submitButton = evt.submitter;

  disableButton(submitButton, validationConfig);
  // fix the initial button text
  const initialText = submitButton.textContent;
  // change the button text before requesting
  _renderLoading(true, submitButton, initialText, loadingText);
  // call the request function to be able to use the promise chain
  request()
    .then(() => {
      // resets the form that on submit called this function
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
      // reenables the button so the user can try again
      if (!finallyEnableButton) {
        enableButton(submitButton, validationConfig);
      }
    })
    .finally(() => {
      _renderLoading(false, submitButton, initialText);
      if (finallyEnableButton) {
        enableButton(submitButton, validationConfig);
      }
    });
}
