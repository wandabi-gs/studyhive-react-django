import { executeMutation } from "../backend";



export const addreviewMutation = async (data) => {
    const {uid, review} = data;

    const mutation = `
        mutation($uid: UUID!, $review: String!){
            addReview(recommendationUid: $uid, review : $review){
                success
            }
        }
    `;

    const variables = { uid, review }
    const response = await executeMutation(mutation, variables);
    return response.addReview;
}


export const deleteReviewMutation = async (uid) => {

    const mutation = `
        mutation($uid: UUID!){
            deleteReview(recommendationUid: $uid){
                success
            }
        }
    `;

    const variables = { uid}
    const response = await executeMutation(mutation, variables);
    return response.deleteReview;
}

export const dislikeRecommendationMutation = async (uid) => {
    const mutation = `
        mutation($uid:UUID!){
            dislikeRecommendation(recommendationUid:$uid){
                success
            }
        }
    `;

    const variables = { uid }
    const response = await executeMutation(mutation, variables);
    return response.dislikeRecommendation;
}


export const likeRecommendationMutation = async (uid) => {
    const mutation = `
        mutation($uid:UUID!){
            likeRecommendation(recommendationUid:$uid){
                success
            }
        }
    `;

    const variables = { uid }
    const response = await executeMutation(mutation, variables);
    return response.likeRecommendation;
}

export const saveNotesMutation = async (data) => {
    const {notes, uid} = data;
    const mutation = `
    mutation($uid:UUID!, $notes:String!){
        addRecommendationNotes(recommendationUid:$uid, notes:$notes){
          success
          error
        }
      }
    `;
    const variables = { uid, notes }
    const response = await executeMutation(mutation, variables);
    return response.addRecommendationNotes;
}
