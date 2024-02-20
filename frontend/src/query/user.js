import { executeQuery } from "../backend";

export const profileQuery = async () => {
    const query = `
        query{
            userProfile{
                uid
                email
                username
                image
                private
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.userProfile;
}

export const userRecommendations = async () => {
    const query = `
        query{
            userRecommendations{
                uid
                email
                username
            }
        }
    `;

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.userRecommendations;
}

export const userConnections = async () => {
    const query = `
        query{
            connections{
                uid
                connectionStatus
                connection{
                    uid
                    email
                    username
                    image
                }
                user{
                    uid
                    email
                    username
                    image
                }
            }
        }
    `;

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.connections;
}

export const userConnection = async (uid) => {
    const query = `
        query($uid : UUID!){
            connection(connectionUid : $uid){
                uid
                connectionStatus
                connection{
                    uid
                    email
                    username
                    image
                }
                user{
                    uid
                    email
                    username
                    image
                }
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.connection;
}

export const recommendedUsers = async () => {
    const query = `
        query{
            recommendedUsers{
                uid
                email
                username
                image
                private
            }
        }
    `;

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.recommendedUsers;
}

export const userQuery = async (uid) => {
    const query = `
        query($uid:UUID!){
            user(userUid:$uid){
                email
                username
                image
                private
            }
        }
    `;

    const variables = {uid}

    const data = await executeQuery(query, variables)

    return data.user;
}