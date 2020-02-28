(function ($) {
  $(function () {

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

window.loadWatsonAssistantChat({
  integrationID: "INTEGRATION_ID", // The ID of this integration.
  region: "us-south" // The region your integration is hosted in.
}).then(function (instance) {
  instance.render();
});