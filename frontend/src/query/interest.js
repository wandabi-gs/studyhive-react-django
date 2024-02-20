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
        query($uid: UUID!){
            category(categoryUid: $uid){
                uid
                name
                description
                intrests{
                    uid
                    name
                    description
                    recommendations{
                        uid
                        title
                        url
                        thumbnail
                        videoId
                    }
                }
            }
        }
    `

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.category;
}

export const interestQuery = async (uid) => {
    const query = `
        query($uid: UUID!){
            interest(interestUid: $uid){
                uid
                name
                description
                recommendations{
                    uid
                    title
                    source
                    url
                    thumbnail
                    videoId
                }
            }
        }
    `

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.interest;
}

export const myInterestQuery = async () => {
    const query = `
        query{
            myInterests{
                interests{
                    uid
                    name
                    description
                    recommendations{
                        uid
                        title
                        url
                        thumbnail
                        videoId
                        source
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
        query($uid:UUID!){
            userInterest(userUid:$uid){
                interests{
                    uid
                    name
                    description
                }
            }
        }
    `

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.userInterest;
}
