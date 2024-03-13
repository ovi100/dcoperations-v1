import {NativeModules} from 'react-native';

const {SunmiScanner} = NativeModules;

type SunmiScanType = {
  startScan: () => void;
  stopScan: () => void;
};

export default SunmiScanner as SunmiScanType;
