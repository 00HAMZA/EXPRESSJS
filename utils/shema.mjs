export const checkUsernameValidator = {
    username : {
        isLength :{
            optiones : {
                min : 3,
                max : 10
            },
            errorMessage : "username name must be between 3 and 10"
        },
        notEmpty : {
            errorMessage : "username cannot be empty"
        },
        isString : {
            errorMessage : "username must ne string"
        }
    }
}