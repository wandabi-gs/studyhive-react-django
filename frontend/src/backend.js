export const BACKEND_URL = 'http://localhost:8000'
// export const BACKEND_URL = 'http://10.0.28.80:8000'
export const API_ENDPOINT = BACKEND_URL + "/api"
export const MEDIA_URL = BACKEND_URL + "/media"

import Cookies from 'js-cookies'

import { GraphQLClient } from 'graphql-request';

export async function executeMutation(mutation, variables) {
  var headers = {}

  if (Cookies.getItem("session_token")) {
    headers = {
      Authorization: `JWT ${Cookies.getItem("session_token")} `
    }
  }

  const graphQLClient = new GraphQLClient(API_ENDPOINT, {
    headers: headers
  });

  try {
    const data = await graphQLClient.request(mutation, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

export async function executeQuery(query, variables) {
  var headers = {}

  if (Cookies.getItem("session_token")) {
    headers = {
      Authorization: `JWT ${Cookies.getItem("session_token")} `
    }
  }

  const graphQLClient = new GraphQLClient(API_ENDPOINT, {
    headers: headers
  });

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

export const showMedia = (url) => {
  return MEDIA_URL + "/" + url
}

export const is_authenticated = () => {
  return Cookies.getItem('session_token') ? true : false;
}