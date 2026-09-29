export const registerusers = {
    email : 'ex@gmai.com',
    password : 'Test@12345',
    confirmpassword : 'Test@12345'
}

export const passwordTest = [
    {
        name : 'Password less than 8 characters',
        password : 'Tea@123'
    },
    {
        name: 'Password without uppercase letter',
        password: 'test@1234',
    },
    {
        name: 'Password without lowercase letter',
        password: 'TEST@1234',
    },
    {
        name: 'Password without number',
        password: 'Test@abcd',
    },
    {
        name: 'Password without special character',
        password: 'Test1234',
    },
];