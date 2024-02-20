import { executeQuery } from "../backend";

export const groupsQuery = async () => {
    const query = `
        query{
            groups{
                uid
                private
                name
                description
                createdAt
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.groups;
}


export const groupQuery = async (uid) => {
    const query = `
        query($uid: UUID!){
            group(uid: $uid){
                uid
                private
                name
                interests{
                    uid
                    name
                }
                description
                createdAt
            }
        }
    `

    const variables = {uid}

    const data = await executeQuery(query, variables)

    return data.group;
}

export const userGroupsQuery = async () => {
    const query = `
        query{
            userGroups{
                uid
                private
                name
                interests{
                    uid
                    name
                }
                description
                createdAt
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.userGroups;
}