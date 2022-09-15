const randomStr = () =>
  (Math.random() + 1).toString(36).substring(5) + (Math.random() + 1).toString(36).substring(5);
export default randomStr;
