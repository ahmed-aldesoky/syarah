// export interface CommentsResponse {
//     data:{ id:number,
//     attributes:{
//         carId:number,
//         userID:number,
//         content:string,
//         date:string
//     }
// }[]
    
// }
export type CommentsResponse=Comment[]

export interface Comment {
        id?:number,
        carID?:any,
        userID?:any,
        content?:string,
        date?:string
    }
    
    export interface PostCommentPayload{
        
            carID:string,
            userID:any,
            content:string,
            date:string

         }


