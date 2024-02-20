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

export const youtubeRecommendationQuery = async (uid) => {
    const query = `
        query($uid:UUID!){
            recommendation(recommendationUid: $uid) {
                title
                videoId
                userreviewSet {
                    review
                    like
                    dislike
                }
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.recommendation;
}

export const userReviewQuery = async (uid) => {
    const query = `
        query($uid:UUID!){
            userReview(recommendationUid:$uid){
                user{
                    email
                }
                review
                like
                dislike
                updatedAt
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.userReview;
}

export const recommendationReviewsQuery = async (uid) => {
    const query = `
        query($uid:UUID!){
            recommendationReviews(recommendationUid:$uid){
                user{
                    username
                    email
                }
                review
                like
                dislike
                updatedAt
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.recommendationReviews;
}

export const recommendationNotesQuery = async (uid) => {
    const query = `
        query($uid:UUID!){
            recommendationNotes(recommendationUid:$uid){
                notes
            }
        }
    `;

    const variables = { uid }

    const data = await executeQuery(query, variables)

    return data.recommendationNotes;
}