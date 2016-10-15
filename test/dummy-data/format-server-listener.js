module.exports = function(serverListener) {
  return {
    toUrlAuthority: function() {
      return serverListener.address().address + ":" + serverListener.address().port;
    },
    toGitHttpUrl: function() {
      return "http://" + this.toUrlAuthority() + "/.git";
    }
  };
};