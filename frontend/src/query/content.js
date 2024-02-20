import { executeQuery } from "../backend";


export const myContentsQuery = async () => {
    const query = `
        query{
            myContents{
                uid
                title
                description
                contentType
            }
        }
    `

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.myContents;
}

export const myContentQuery = async (uid) => {
    const query = `
        query($uid: UUID!){
            myContent(contentUid: $uid){
                uid
                title
                description
                contentType
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.myContent;
}

export const userContentsQuery = async () => {
    const query = `
        query{
            userContents{
                uid
                title
                description
                contentType
            }
        }
    `;

    const variables = {}

    const data = await executeQuery(query, variables)

    return data.userContents;
}

export const userContentQuery = async (uid) => {
    const query = `
        query($uid: UUID!){
            userContent(contentUid: $uid){
                uid
                title
                description
                contentType
            }
        }
    `;
    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.userContent;
}