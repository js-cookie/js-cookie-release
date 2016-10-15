module.exports = function(listener) {
  return listener.address().address + ":" + listener.address().port;
};