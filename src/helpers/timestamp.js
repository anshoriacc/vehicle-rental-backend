const getTimestamp = () => {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
  const DD = (now.getDate() < 10 ? '0' : '') + now.getDate();
  const HH = (now.getHours() < 10 ? '0' : '') + now.getHours();
  const mm = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  const ss = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();

  return YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm + ':' + ss;
};

module.exports = {getTimestamp};
