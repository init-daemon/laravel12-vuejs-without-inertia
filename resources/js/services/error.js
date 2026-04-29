export const errorsFromResponse = (response) => {
    if (response) {
        const errors = response?.data?.errors?.errors || response.data?.errors;
        
        if (errors ) {
            return errors;
        }
    }

    return {
        message: 'Invalid',
    }

}



export const getFirstErrorMessage = (errors) => {
    if (!errors || typeof errors !== 'object') return '';
    
    const firstField = Object.keys(errors).find(key => 
        Array.isArray(errors[key]) && errors[key].length > 0
    );
    
    if (firstField && errors[firstField][0]) {
        return errors[firstField][0];
    }
    
    return '';
};


export const getErrorsByKey = (errors, key) => {
    try {
        return errors[key][0];
    } catch (e) {
        return '';
    }
}