const usersUrl = 'https://dish-dilemma-api.onrender.com/users';

export const register = async (registerDataState) => {
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

export const login = async (loginDataState) => {
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

export const logout = async (accessToken) => {
  const response = await fetch(`${usersUrl}/logout`, {
    method: 'GET',
    headers: { 'X-Authorization': accessToken },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const getUserDetails = async (accessToken) => {
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
