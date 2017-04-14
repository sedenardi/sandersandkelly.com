(function() {
  const FormCarousel = require('form-carousel');

  const postUrl = 'https://script.google.com/macros/s/AKfycbxJa91d83Bok5ChngfUPftsxG-X4EkZvpSSggwvpxfnNT7Zy7kw/exec';
  const declineText = 'Thank you for letting us know. We\'re sorry to hear you can\'t make it.';

  const submitForm = function(form) {
    fetch(postUrl, {
      method: 'POST',
      body: new FormData(form)
    });
  };

  const carousel = new FormCarousel('#rsvp-form', {
    onSubmit: function(form) {
      submitForm(form);
      carousel.setSubmitted();
    },
    onEscape: function(input, form) {
      if (input.value.trim().toLowerCase() === 'no') {
        submitForm(form);
        form.querySelector('.final-message').innerHTML = declineText;
        carousel.setSubmitted();
        return false;
      } else {
        return true;
      }
    }
  });
})();
