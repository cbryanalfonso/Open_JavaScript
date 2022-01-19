import axios from 'axios';
import { useState } from 'react';
// import database from '@react-native-firebase/database';

const qs = require('qs');

export function apiCall() {
  var config = {
    method: 'get',
    url: 'https://openfinance2020-292200.firebaseio.com/events.json',
    headers: {},
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        const data = Object.values(response.data);
        data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        resolve(data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export function apiColors() {
  var config = {
    method: 'get',
    url: 'https://openfinance2020-292200.firebaseio.com/brandings/valor1.json',
    headers: {},
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

// actual

const query =
  'https://us-central1-openfinance2020-292200.cloudfunctions.net/query';
const queryRS =
  'https://us-central1-openfinance2020-292200.cloudfunctions.net/requestService';
const fintechthon =
  'https://us-central1-openfinance2020-292200.cloudfunctions.net/fintechthon';
let conf = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'AIzaSyDfp9fwr-14_xjhXUhDfmH1LJfsNDIWjeE',
  },
};

export {query, conf};

/////
export function getFilterCompanyGOM(texFilter) {
  var data = qs.stringify({
    type: 'serviceGom',
    action: 'filterNameService',
    texFilter: texFilter,
  });
  conf = {
    ...conf,
    method: 'post',
    url: query,
    data: data,
  };
  return new Promise((resolve, reject) => {
    axios(conf)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.response);
      });
  });
}
///////

export function getFilterCategory() {
  var data = qs.stringify({
      type: 'crudRadarCategory',
      action: 'get',
  });
  conf = {
      ...conf,
      method: 'POST',
      url: query,
      data: data,
  };
  return new Promise((resolve, reject) => {
      axios(conf)
          .then(function (response) {
              resolve(response.data);
          })
          .catch(function (error) {
              reject(error.response);
          });
  });
}

export function getCompanies(category){
  var data = qs.stringify({
      type: 'crudRadarCompany',
      action: 'filterCategory',
      category: category,
  });
  conf = {
      ...conf,
      method: 'POST',
      url: query,
      data: data,
  };
  return new Promise((resolve, reject) => {
      axios(conf)
          .then(function (response) {
              resolve(response.data);
          })
          .catch(function (error) {
              reject(error.response);
          });
  });
}

