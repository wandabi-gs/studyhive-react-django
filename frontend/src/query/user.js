import { executeQuery } from "../backend";

export const profileQuery = async () => {
    const query = `
        query{
            userProfile{
                email
                username
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.userProfile;
}
