import { readdir, readFile } from 'fs';

const BASE_DIR = '/sys/bus/w1/devices/';

function parseDirectoryListing (list) {
  return list.filter(function (item) {
    return item.lastIndexOf('28') === 0;
  }).map(function (item) {
    return item.substring(3);
  });
}

function readFiles (files) {
  return files.map(function (file) {
    return new Promise(function (fulfill, reject) {
      const path = getDevicePath(file);
      readFile(path, function (err, content) {
        if (err) {
          reject(err);
        } else {
          fulfill({'name': file, 'data': content.toString()});
        }
      });
    });
  });
}

function getDevicePath (deviceName) {
  return BASE_DIR + '28-' + deviceName + '/w1_slave';
}

function parseFileContents(item) {
  const strData = item.data.toString();
  const lines = strData.split("\n");

  if (lines.length !== 3) throw new Error('Unexpected file format for ' + item.name + ' : ' + strData);

  crc(lines[0]);

  const value = readTemperature(lines[1]);
  return {'name': item.name, 'value': value};
}

function crc (str) {
  const parts = str.split(' ');
  if (parts[parts.length - 1] !== 'YES')
    throw new Error('CRC failed');
}

function readTemperature(str) {
  const parts = str.split(' ');
  const temperature = (parts[parts.length - 1]).split('=')[1];
  return parseFloat(temperature)/1000;
}

export function listDevices () {
  return new Promise(function (fulfill, reject) {
    readdir(BASE_DIR, function (err, list) {
      if (err) {
        reject(err);
      } else {
        const result = parseDirectoryListing(list);
        fulfill(result);
      }
    });
  });
}

export function readDevices () {
  return new Promise(function (fulfill, reject) {
    function handleError (err) {
      reject(err);
    }

    listDevices().then(function (items) {
      Promise.all(readFiles(items)).then(function (fileContents) {
        try {
          const result = fileContents.map(function (item) {
            return parseFileContents(item);
          });
          fulfill(result);
        } catch(e) {
          handleError(e)
        }
      }, handleError);
    }, handleError);
  });
}

export function readDevice (deviceName) {
  return new Promise(function (fulfill, reject) {
    const path = getDevicePath(deviceName);
    readFile(path, function (err, content) {
      if (err) {
        reject(err);
      } else {
        try {
          const result = parseFileContents({'name': deviceName, 'data': content});
          fulfill(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

