### NATIONAL IDENTITY NUMBER VALIDATOR
This Module validate the NIN of a user by doing a mathematical operation.

The Operation is as follows:

![](national-identity-calculation.png)

### Instruction

- To install the package simply execute:

    `npm install national-identity-validator`

- Then in your file import the module:

    `import validateNationalIdentityNumber from 'national-identity-validator';`

    `validateNationalIdentityNumber(nid: 'string', lastname?: 'string', dob?: 'string');` //return boolean value true or false

    date of birth string data should be in the format `YYYY-MM-DD`

    The parameter `lastname` is optional which will validate the last name of the person by comparing the first character of the last name with the first character from the nid.

    The parameter `dob` is optional which will validate the date of birth of the person by comparing the dob with the date of birth of the person from the nid.

### Issues about type

- Simply add type in your package.json file

    "type": "module",