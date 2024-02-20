import { executeMutation } from "../backend";

export const joinGroupMutation =async (uid) => {
    const mutation = `
        mutation($uid:UUID!){
            joinGroup(groupUid: $uid){
                group{
                    uid
                    name
                }
                error
                success
            }
        }
    `;
    const variables = { uid }
    const response = await executeMutation(mutation, variables);
    return response.joinGroup;
}

export const leaveGroupMutation =async (uid) => {
    const mutation = `
        mutation($uid:UUID!){
            leaveGroup(groupUid: $uid){
                group{
                    uid
                    name
                }
                error
                success
            }
        }
    `;
    const variables = { uid }
    const response = await executeMutation(mutation, variables);
    return response.leaveGroup;
}

export const createGroupMutation =async (data) => {
    const { name, description, isprivate } = data;
    console.log({ name, description, isprivate })

    const mutation = `
        mutation($name:String!, $description:String!, $isprivate:Boolean){
            createGroup(name: $name, description: $description, private: $isprivate){
                group{
                    uid
                    name
                }
                error
                success
            }
        }
    `;
    const variables = { name, description, isprivate}
    const response = await executeMutation(mutation, variables);
    return response.createGroup;
}
