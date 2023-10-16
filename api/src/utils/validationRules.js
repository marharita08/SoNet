import {names as validation} from "../constants/validation";

const baseEmailRules = [
    {
        name: validation.REQUIRED,
    },
    {
        name: validation.EMAIL,
    },
    {
        name: validation.MAX,
        value: 255,
    },
];

export const rules = {
    required: [{name: validation.REQUIRED}],
    password: [
        {
            name: validation.REQUIRED,
        },
        {
            name: validation.MIN,
            value: 8,
        },
    ],
    email: [...baseEmailRules],
    emailUpdate: [
        ...baseEmailRules,
        {
            name: validation.UNIQUE,
        },
    ],
    name: [
        {
            name: validation.REQUIRED,
        },
        {
            name: validation.MAX,
            value: 255,
        },
    ],
    phone: [
        {
            name: validation.REGEXP,
            value: /^\+380\d{9}$/,
        },
    ],
};
