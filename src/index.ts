/*
 * Copyright (c) 2022 Mamode Saëb Sa'ad
 */

const CHAR_VALUES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

/**
 * It's checking if the national identity number is valid by checking if the sum of the national
 * identity number is divisible by 17, if the first character of the lastname is equal to the first
 * character of the national identity number and if the date of birth is equal to the date of birth in
 * the national identity number
 * @param {string} nid - The national identity number.
 * @param {string} [lastname] - The lastname of the person.
 * @param {string} [dob] - date of birth in format: dd/mm/yyyy
 * @returns It's returning a boolean value.
 */
const validateNationalIdentityNumber = (
  nid: string,
  lastname?: string,
  dob?: Date | string
): boolean => {
  //   const dateOfBirth = new Date('Wed Mar 15 2023 09:56:29 GMT+0400 (Gulf Standard Time)');
  //   console.log(new Date('Wed Mar 15 2023 09:56:29 GMT+0400 (Gulf Standard Time)').toISOString().slice(0, 10))
  const Nid_Array: number[] = [];
  const split_string: string[] = nid.split("");

  let isValidNID: boolean = false;

  let validSurname: boolean = false;
  let validateDate: boolean = false;
  let validateNationalIdentity: boolean = false;

  let identityNumberRange: number;
  let sum: number = 0;

  /* Looping through the string and pushing the 
    index of each character to the array. */

  split_string.forEach((element) => {
    Nid_Array.push(CHAR_VALUES.indexOf(element));
  });

  identityNumberRange = Nid_Array.length;

  /* Looping through the array and multiplying 
    each element by the identityNumberRange and then
    decrementing the identityNumberRange by 1. */

  Nid_Array.forEach((element) => {
    sum += element * identityNumberRange;
    identityNumberRange--;
  });

  /* It's checking if the sum of the national identity number is divisible by 17. */
  validateNationalIdentity = !!(sum % 17 === 0);

  //section that validate the first character of the string
  /* It's checking if the first character of the lastname is equal to the first character of the
    national identity number. */
  if (!!lastname && lastname.slice(0, 1) === nid.slice(0, 1)) {
    validSurname = !!(lastname.slice(0, 1) === nid.slice(0, 1));
  }

  if (!!nid && !!lastname && !!dob) {
    if (typeof dob === "string") {
      if (dob.includes("/")) {
        validateDate =
          !!(dob.split("/")[0].slice(2, 4) === nid.slice(5, 7)) &&
          !!(dob.split("/")[1] === nid.slice(3, 5)) &&
          !!(dob.split("/")[2] === nid.slice(1, 3));

        isValidNID = validateNationalIdentity && validSurname && validateDate;
      }

      if (dob.includes("-")) {
        validateDate =
          !!(dob.split("-")[0].slice(2, 4) === nid.slice(5, 7)) &&
          !!(dob.split("-")[1] === nid.slice(3, 5)) &&
          !!(dob.split("-")[2] === nid.slice(1, 3));

        isValidNID = validateNationalIdentity && validSurname && validateDate;
      }
    } else {
      // console.log(new Date(dob).toISOString().slice(0, 10));
      let dateofbirth = new Date(dob).toISOString().slice(0, 10);
      validateDate =
        !!(dateofbirth.split("-")[0].slice(2, 4) === nid.slice(5, 7)) &&
        !!(dateofbirth.split("-")[1] === nid.slice(3, 5)) &&
        !!(dateofbirth.split("-")[2] === nid.slice(1, 3));

      isValidNID = validateNationalIdentity && validSurname && validateDate;
    }
  } else if (!!nid && !!lastname) {
    isValidNID = validateNationalIdentity && validSurname;
  } else {
    isValidNID = validateNationalIdentity;
  }

  return isValidNID;
};

export default validateNationalIdentityNumber;
