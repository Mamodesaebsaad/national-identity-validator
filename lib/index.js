/*
 * Copyright (c) 2022 Mamode Saëb Sa'ad
 */
const CHAR_VALUES = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
];
/**
 * The function takes a string as an argument and returns a boolean value
 * @param {string} n - string - The national identity number.
 * @returns A boolean value.
 */
const validateNationalIdentityNumber = (n) => {
    const Nid_Array = [];
    const split_string = n.split("");
    let isValidNID = false;
    let identityNumberRange;
    let sum = 0;
    /* Looping through the string and pushing the
    index of each character to the array. */
    split_string.forEach(element => {
        Nid_Array.push(CHAR_VALUES.indexOf(element));
    });
    identityNumberRange = Nid_Array.length;
    /* Looping through the array and multiplying
    each element by the identityNumberRange and then
    decrementing the identityNumberRange by 1. */
    Nid_Array.forEach(element => {
        sum += element * identityNumberRange;
        identityNumberRange--;
    });
    /* It's a ternary operator. It's a shorthand way of writing
    an if/else statement. */
    sum % 17 === 0 ?
        isValidNID = true :
        isValidNID = false;
    return isValidNID;
};
export default validateNationalIdentityNumber;
