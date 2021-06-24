// Validating forms using Javascript

// Constraint Validation API - on buttons, fieldsets, inputs, outputs, selects, and textareas

// validationMessage - returns message saying what constraints are not satisfied, empty string if not constraint validation element
// validity - ValidityState object with properties:
// patternMismatch - true if no match
// tooLong - true if value longer than maxlength attribute
// tooshort - true if value shorter than minlength attribute
// rangeOverflow - Returns true if the value is greater than the maximum specified by the max attribute, also matches out-of-range pseudo class
// rangeUnderflow - Returns true if the value is less than the minimum specified by the min attribute, also matches out-of-range pseudo class
// typeMismatch - Returns true if the value is not in the required syntax (when type is email or url)
// valid - Returns true if the element meets all its validation constraints, and is therefore considered to be valid
// valueMissing - Returns true if the element has a required attribute, but no value


// willValidate: Returns true if the element will be validated when the form is submitted

// Methods of Constraint Validation API 
// checkValidity(): Returns true if the element's value has no validity problems
// setCustomValidity(message): Adds a custom error message to the element; if you set a custom error message, the element is considered to be invalid, and the specified error is displayed

// Customizing Error Messages
const email1 = document.getElementById("t2");

email1.addEventListener("input", function (event) {
  if (email1.validity.typeMismatch) {
    email1.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email1.setCustomValidity("");
  }
});



// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form  = document.getElementsByTagName('form')[0];

const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener('submit', function (event) {
  // if the email field is valid, we let the form submit

  if(!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if(email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if(email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}



// The Fetch API
// Uses Service Workers

// Doesn't reject on HTTP error status, but ok status can be set to false if response outside of range 200-299, rejects on network status
// First param is url, second (optional) is init object for settings
// keepalive - allows request to outlive the page

// The return value is the promise that resolves to a response object
// Exceptions - AbortError (call to AbortController abort())
// TypeError - URL string has user credentials, info needs Authorization header

// const myImage = document.querySelector('img');

// let myRequest = new Request('flowers.jpg');

// fetch(myRequest)
// .then(function(response) {
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.blob(); //Handled this way because image
// })
// .then(function(response) {
//   let objectURL = URL.createObjectURL(response);
//   myImage.src = objectURL;
// });

// Can pass init object into fetch request or the Request object

// What is cache in the request options? I'm also confused on what cors is in the methods
// Difference between response and request?
// Will the browser page redirect to the fetch request if fetch options has redirect?
// Are credentials like setting cookies from another url?
// What is a referrer, referrerPolicy, and integrity?