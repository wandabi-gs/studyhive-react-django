import { executeQuery } from "../backend";

export const profileQuery = async () => {
    const query = `
        query{
            userProfile{
                email
                username
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
                }
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.connection;
}