import React, { SyntheticEvent, useState } from 'react';

export const App: React.FunctionComponent = () => {
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [privacyKey, setPrivacyKey] = useState<string>('');

  const checkKey = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${privacyKey}&format=json&by=position&lat=40.689247&lng=-74.044502`
      );
      const { status } = await response.json();
      if (status === 'OK') {
        setShowForm(true);
        setErrorMessage('');
      } else {
        setErrorMessage('privacyKey may not valid');
      }
    } catch (e) {
      console.log(e);
      setErrorMessage('privacyKey may not valid');
    }
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (latitude === undefined || longitude === undefined) {
      setErrorMessage('latitude or longitude missed');
    }
    try {
      const res = await fetch(
        `/get-time-zone?key=${privacyKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
      );
      const { status, formatted, message } = await res.json();
      if (status !== 'OK') {
        setLocalTime(message);
      } else {
        setLocalTime(formatted);
      }
    } catch (e) {
      console.error(e);
      setLocalTime('something is wrong with the timezonedb services');
    }
  };
  if (!showForm) {
    return (
      <div className="mt-3">
        {errorMessage && <p className="row justify-content-md-center">{errorMessage}</p>}
        <form onSubmit={checkKey}>
          <label className="row justify-content-md-center">
            Please input you API key provided by
            <a href="https://timezonedb.com/" target="_blank" rel="noreferrer">
              https://timezonedb.com/
            </a>
          </label>
          <div className="row justify-content-md-center">
            <input
              className="col-3"
              type="text"
              value={privacyKey || ''}
              onChange={(e) => setPrivacyKey(e.target.value)}
            />
            <input className="col-2 btn btn-dark ml-3" type="submit" />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {errorMessage && <p className="row justify-content-md-center">{errorMessage}</p>}
      <form>
        <div className="row justify-content-md-center">
          <label className="col-3" htmlFor="latitude">
            {' '}
            latitude (-90 to 90)
          </label>
          <input
            className="col-2"
            type="number"
            placeholder="latitude"
            min="-90"
            max="90"
            value={latitude || ''}
            id="latitude"
            name="latitude"
            onChange={(e) =>
              setLatitude(e.target.value === '' ? undefined : parseFloat(e.target.value))
            }
          />
        </div>
        <div className="row justify-content-md-center mt-2">
          <label className="col-3" htmlFor="longitude">
            {' '}
            longitude(-180 to 180){' '}
          </label>
          <input
            className="col-2"
            type="number"
            placeholder="longitude"
            min="-180"
            max="180"
            id="longitude"
            name="longitude"
            value={longitude || ''}
            onChange={(e) =>
              setLongitude(e.target.value === '' ? undefined : parseFloat(e.target.value))
            }
          />
        </div>
        {localTime && (
          <p className="row justify-content-md-center mt-2">Local Time is: {localTime}</p>
        )}
        <div className="row justify-content-md-center">
          <input className="btn btn-dark mt-3 " type="submit" onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
};
