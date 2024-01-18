import { executeMutation } from "../backend";

export const UserLogin = async (data) => {
  const { email, password } = data;

  const mutation = `
    mutation($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
      }
    }
  `;

  const variables = { email, password };

  const response = await executeMutation(mutation, variables);

  return response.loginUser.token;
};

export const UserRegister = async (data) => {
  const { email, password, username } = data;

  const mutation = `
    mutation($email: String!, $password: String!, $username: String) {
      registerUser(email: $email, password: $password, username: $username) {
        success
        message
        error {
          field
          message
        }
      }
    }
  `;

  const variables = { "email": email, "password": password, "username": username };

  const response = await executeMutation(mutation, variables);

  return response.registerUser;
};

export const changePassword = async (data) => {
  const { oldPassword, newPassword } = data;

  const mutation = `
    mutation($oldPassword: String!, $newPassword: String!) {
      changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
        success
        message
        error {
          field
          message
        }
      }
    }
  `;

  const variables = { "oldPassword": oldPassword, "newPassword": newPassword };
  const response = await executeMutation(mutation, variables);

  return response.changePassword;

}

export const TogglePrivate = async () => {
  const mutation = `
    mutation {
      togglePrivate {
        success
        message
      }
    }
  `;

  const variables = {};

  const response = await executeMutation(mutation, variables);

  return response.togglePrivate;
}