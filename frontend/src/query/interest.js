import { executeQuery } from "../backend";

export const categoriesQuery = async () => {
    const query = `
        query{
            categories{
                uid
                name
                description
                intrests{
                    uid
                    name
                    description
                }
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.categories;
}

export const categoryQuery = async (uid) => {
    const query = `
        query($uid: String!){
            category(categoryUid: $uid){
                uid
                name
                description
                intrests{
                    uid
                    name
                    description
                }
            }
        }
    `

    const variables = {uid}

    const data = await executeQuery(query, variables)

    return data.category;
}

export const intrestQuery = async (uid) => {
    const query = `
        query($uid: String!){
            intrest(intrestUid: $uid){
                uid
                name
                description
                recommendations{
                    uid
                    title
                    url
                    preview
                }
            }
        }
    `

    const variables = {uid}

    const data = await executeQuery(query, variables)

    return data.intrest;
}

export const myInterestQuery = async () => {
    const query = `
        query{
            myInterests{
                interests{
                    uid
                    name
                    recommendations{
                        uid
                        title
                        url
                        preview
                    }
                }
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.myInterests;
}

export const userInterestQuery = async (uid) => {
    const query = `
        query($uid:UUID){
            userInterests{
                interests{
                    uid
                    name
                }
            }
        }
    `

    const variables = {uid}

    const data = await executeQuery(query, variables)

    return data.userInterests;
}
