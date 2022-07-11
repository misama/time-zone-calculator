import fetch from 'isomorphic-fetch';
import { SERVICE_URL } from '../config';

export interface LOCALTIMEPROPS {
  status: 'OK' | 'ERROR';
  formatted?: string;
  message?: string;
}

export interface REQPOPS {
  latitude: string;
  longitude: string;
  key: string;
}
export const getLocalTimeFromService = async ({
  latitude,
  longitude,
  key,
}: REQPOPS): Promise<LOCALTIMEPROPS> => {
  let formatted = '';
  try {
    console.log('getting request for: ', latitude, longitude);
    const res = await fetch(
      `${SERVICE_URL}?key=${key}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
    const { status, formatted: localTime, message } = await res.json();
    if (status !== 'OK') {
      return {
        status: 'ERROR',
        message,
      };
    }
    formatted = localTime;
  } catch (e: any) {
    return {
      status: 'ERROR',
      message: e.message,
    };
  }
  return {
    status: 'OK',
    formatted,
  };
};
