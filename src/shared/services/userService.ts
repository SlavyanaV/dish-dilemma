import { LoginType, RegisterType } from '../types';

// const usersUrl = 'http://localhost:3030/users';
const usersUrl = 'https://dish-dilemma-api.onrender.com/users';

export const register = async (registerDataState: RegisterType) => {
  const response = await fetch(`${usersUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: registerDataState.email,
      password: registerDataState.password,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};

export const login = async (loginDataState: LoginType) => {
  const response = await fetch(`${usersUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginDataState),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};

export const logout = async (accessToken: string) => {
  const response = await fetch(`${usersUrl}/logout`, {
    method: 'GET',
    headers: { 'X-Authorization': accessToken },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getUserDetails = async (accessToken: string) => {
  const response = await fetch(`${usersUrl}/me`, {
    method: 'GET',
    headers: {
      'X-Authorization': accessToken,
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  } else {
    return responseData;
  }
};
