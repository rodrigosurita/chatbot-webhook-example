(function ($) {
  $(function () {

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

window.loadWatsonAssistantChat({
  integrationID: "d707076d-271b-4f5f-bc9d-a82465ba2ce9", // The ID of this integration.
  region: "us-south" // The region your integration is hosted in.
}).then(function (instance) {
  instance.render();
});