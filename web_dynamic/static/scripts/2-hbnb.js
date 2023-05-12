const selectedAmenities = {};
$(document).ready(function () {
  /* check api status */
  $.get('http://0.0.0.0:5001/api/v1/status', function (res, status) {
    if (status === 'success') {
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  });

  /* amenity filter system */
  $('.amenities input').each(function () {
    $(this).bind('change', function (e) {
      if (e.target.checked) {
        if (!Object.prototype.hasOwnProperty.call(selectedAmenities, e.target.getAttribute('data-name'))) {
          selectedAmenities[e.target.getAttribute('data-name')] = (e.target.getAttribute('data-id'));
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(selectedAmenities, e.target.getAttribute('data-name'))) {
          delete selectedAmenities[e.target.getAttribute('data-name')];
        }
      }
      if (Object.keys(selectedAmenities).length > 0) {
        $('.amenities h4').text(Object.keys(selectedAmenities).join(', '));
      } else {
        $('.amenities h4').html('&nbsp;');
      }
    });
  });
});
