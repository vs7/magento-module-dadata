(function ($j, window, document, undefined) {
  "use strict";

  function initName(information) {
    var $surname = getElementById(information.last_name);
    var $name = getElementById(information.first_name);
    var $patronymic = getElementById(information.middle_name);
    var fioParts = ["SURNAME", "NAME", "PATRONYMIC"];
    $j.each([$surname, $name, $patronymic], function(index, $el) {
      var sgt = $el.suggestions({
        token: _dadataSettings.token,
        type: "NAME",
        triggerSelectOnSpace: false,
        hint: "",
        noCache: true,
        params: {
          parts: [fioParts[index]]
        }
      });
    });
  }

  function initAddress(information) {
    var $address = getElementById(information.address);
    $address.suggestions({
      token: _dadataSettings.token,
      type: "ADDRESS",
      count: 5,
      onSelect: function (suggestion) {
        if (document.getElementById(information.postal_code)) {
          document.getElementById(information.postal_code).value = suggestion.data.postal_code;
        }
        if (document.getElementById(information.city)) {
          document.getElementById(information.city).value = suggestion.data.city;
        }
      }
    });
  }

  function initFullName(information) {
    var fullNames = _dadataSettings.other.fullnames;
    var fullNamesArray = fullNames.split(',');
    $j.each(fullNamesArray, function (index, el) {
      var $el = $j(getElementById(el));
      if ($el.length) {
        $el.suggestions({
          token: _dadataSettings.token,
          type: "NAME",
          triggerSelectOnSpace: false,
          hint: "",
          noCache: true
        });
      }
    });
  }

  function getElementById(selectorId) {
    return $j(document.getElementById(selectorId));
  }

  $j(document).on('ready', function () {
    if (getElementById(_dadataSettings.billing.address).length) {
      initName(_dadataSettings.billing);
      initAddress(_dadataSettings.billing);
    }
    if (getElementById(_dadataSettings.shipping.address).length) {
      initName(_dadataSettings.shipping);
      initAddress(_dadataSettings.shipping);
    }
    if (getElementById(_dadataSettings.customer.address).length) {
      initName(_dadataSettings.customer);
      initAddress(_dadataSettings.customer);
    }
    initFullName(_dadataSettings.other.fullnames);
  });
})(jQuery.noConflict(), window, document);