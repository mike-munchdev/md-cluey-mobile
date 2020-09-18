import * as Permissions from 'expo-permissions';
import { AlertHelper } from './alert';

export const verifyPermissions = async () => {
  const result = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );
  if (result.status !== 'granted') {
    AlertHelper.show(
      'error',
      'Insufficient permissions!',
      'You need to grant camera permissions to use this app.'
    );
    return false;
  }
  return true;
};
