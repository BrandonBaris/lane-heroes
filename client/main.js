Template.main.helpers({
  whichView: function() {
    return Session.get('currentView');
  }
});

Template.main.rendered = function ( event ) {
  resetUserState();
};