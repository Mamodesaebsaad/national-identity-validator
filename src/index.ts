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


interface Validator {
  isValid :         boolean,
  isNidValid:       boolean,
  isSurnameValid:   boolean,
  isValidDob:       boolean,
  age:               number

}
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
): Validator => {
  //   const dateOfBirth = new Date('Wed Mar 15 2023 09:56:29 GMT+0400 (Gulf Standard Time)');
  //   console.log(new Date('Wed Mar 15 2023 09:56:29 GMT+0400 (Gulf Standard Time)').toISOString().slice(0, 10))
  const Nid_Array: number[] = [];
  const split_string: string[] = nid.split("");

  let validSurname: boolean = true;
  let validateDate: boolean = true;
  let validateNationalIdentity: boolean;
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


  /* It's checking if the first character of the lastname is equal to the first character of the
  national identity number. */
  if (lastname) {
    validSurname =
      lastname.slice(0, 1).toUpperCase() === nid.slice(0, 1).toUpperCase();
  }

/**
 * It takes a date of birth and a separator and returns true if the date of birth matches the date of
 * birth in the NID
 * @param {string} dob - The date of birth in the format of dd-mm-yy
 * @param {string} [separator=-] - The separator used in the date of birth.
 * @returns const getValidationDate = (dob: string, separator: string = "-") => {
 *     return (
 *       dob.split(separator)[0].slice(2, 4) === nid.slice(5, 7) &&
 *       dob.split(separator)[1] === nid.slice(3, 5) &&
 */
  const getValidationDate = (dob: string, separator: string = "-") => {
    return (
      dob.split(separator)[0].slice(2, 4) === nid.slice(5, 7) &&
      dob.split(separator)[1] === nid.slice(3, 5) &&
      dob.split(separator)[2] === nid.slice(1, 3)
    );
  };


  const getAge = (): number => {
    let rawDate: string = nid.slice(1,7);
    let year: string  = rawDate.slice(4);
    let month: string = rawDate.slice(2,4);
    let date: string = rawDate.slice(0,2)
    let userDate: Date = new Date(year + "-" + month + "-" + date);

    let rawAge: number =  new Date().getTime() - userDate.getTime();
    let age: number = new Date(rawAge).getUTCFullYear() - 1970
        
    return age;
}

 /* It's checking if the date of birth is a string or a date object and then it's checking if the date
 of birth is in the format of dd/mm/yyyy or dd-mm-yyyy. */
  if (dob) {
    if (typeof dob !== "object") {
      if (dob.includes("/")) {
        validateDate = getValidationDate(dob, "/");
      }

      if (dob.includes("-")) {
        validateDate = getValidationDate(dob);
      }
    } else {
      validateDate = getValidationDate(
        dob.toLocaleString("sv", { timeZoneName: "short" }).slice(0, 10)
      );
    }
  }

  // return validateNationalIdentity && validSurname && validateDate;

  return {
    isValid: validateNationalIdentity && validSurname && validateDate,
    isNidValid: validateNationalIdentity,
    isSurnameValid: validSurname,
    isValidDob: validateDate,
    age: getAge()
}
};

export default validateNationalIdentityNumber;
