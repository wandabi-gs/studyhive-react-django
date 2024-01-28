import { executeMutation } from "../backend";


export const addUserIntrestMutation =async (uid) => {
    const mutation = `
        mutation($uid:UUID){
          addInterest(interestUid: $uid){
            success
          }
        }
    `;

    const variables = { uid }
    const response = await executeMutation(mutation, variables);
    return response.addInterest.success;
}

// removeInterest(interestUid

export const removeUserIntrestMutation =async (uid) => {
  const mutation = `
      mutation($uid:UUID!){
        removeInterest(interestUid: $uid){
          success
        }
      }
  `;

  const variables = { uid }
  const response = await executeMutation(mutation, variables);
  return response.removeInterest.success;
}

export const clearInterestMutation = async () => {
  const mutation = `
    mutation {
      clearInterest {
        success
      }
    }
  `;

  const response = await executeMutation(mutation);
  return response.clearInterest.success;
}