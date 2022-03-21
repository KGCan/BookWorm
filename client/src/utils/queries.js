//New file added
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks {
            bookID
            authors
            image
            description
            title
            link
        }
    }
}
`;