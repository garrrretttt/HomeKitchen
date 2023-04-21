import { Account } from "./account";

export const ACCOUNTS: Account[] = [
    {id : 0,    isChef : true,  name : 'Master',    dietaryRestrictions : ['None'], 
    bio : 'I am master chef', profilePicture : '', 
    ratings : {'Diner': [5], 'Chef': [4, 5, 4]},    username: 'master',     password: 'account'},

    {id : 1,    isChef : false,  name : 'Alan Turing',    dietaryRestrictions : ['None'], 
    bio : 'I like to eat', profilePicture : '', 
    ratings : {'Diner': [5, 3, 3], 'Chef': []},    username: 'Alan',     password: 'Turing'}
]