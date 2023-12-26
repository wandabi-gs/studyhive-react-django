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


export const addUserIntrestMutation =async (uid) => {
    const mutation = `
        mutation($uid:String){
            
        }
    `;
}