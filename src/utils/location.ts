import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await _getLocationAsync();

      const result = await _attemptReverseGeocodeAsync(
        location.coords.latitude,
        location.coords.longitude
      );

      if (result.length > 0) {
        resolve({
          ...result[0],
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        throw new Error('Location could not be retrieved');
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const _getLocationAsync = async (): Promise<Location.LocationData> => {
  return new Promise(async (resolve, reject) => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        reject('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});

      resolve(location);
    } catch (e) {
      reject(e);
    }
  });
};

export const _attemptReverseGeocodeAsync = async (
  latitude: number,
  longitude: number
): Promise<Location.Address[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await Location.reverseGeocodeAsync({ latitude, longitude });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

export const _attemptGeocodeAsync = async (address: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await Location.geocodeAsync(address);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};
