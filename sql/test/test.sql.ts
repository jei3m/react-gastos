export const returnResponse = () => {
    return `SELECT @response AS response;`;
};

export const createTest = () => {
    return `CALL manage_test 
            (
                NULL,
                :actionType,
                :name,
                :description,
                @response
            );`;
};

export const getTests = () => {
    return `SELECT
                name,
                description,
                created_at AS createdAt
            FROM
                tests;`;
};

export const updateTest = () => {
    return `CALL manage_test 
            (
                :id,
                :actionType,
                :name,
                :description,
                @response
            );`;
};

export const deleteTest = () => {
    return `CALL manage_test 
            (
                :id,
                :actionType,
                NULL,
                NULL,
                @response
            );`;
};