import { ToastAndroid } from 'react-native';

const Toast = ({message}) => {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
  );
};

export default Toast;
