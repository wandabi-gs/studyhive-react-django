import { executeMutation } from "../backend";

export const uploadContentMutation = async (data) => {
    const { interest, title, description, contentType, upload } = data;
    console.log({ interest, title, description, contentType, upload })
    const mutation = `
        mutation($interest:UUID!, $title:String!, $description:String!, $contentType:String!, $upload : Upload!){
            uploadContent(contentType:$contentType, description:$description, title:$title, upload : $upload, interest:$interest){
                success
                error
                content{
                    title
                    uid
                }
            }
        }
    `;
    const variables = { interest, title, description, contentType, upload }
    const response = await executeMutation(mutation, variables);
    return response.uploadContent;
}