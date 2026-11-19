import { RuleTester } from "@typescript-eslint/rule-tester"
import rule from "."

const options: [string[]] = [
    ["^@internal/.*", "^\\.\\./utils/.*"],
]


const ruleTester = new RuleTester({})

describe("pattern-restricted-import", () => {
    describe("should allow unrelated imports", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [
                {
                    code: "import fs from 'fs'",
                    options: options,
                },
                {
                    code: "import something from './local/module'",
                    options: options,
                },
            ],
            invalid: [],
        })
    })

    describe("should disallow @internal imports", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [],
            invalid: [
                {
                    code: "import utils from '@internal/utils'",
                    options: options,
                    errors: [
                        {
                            messageId: "restrictedImport",
                            data: {
                                importPath: "@internal/utils",
                                pattern: "/^@internal/.*/",
                            },
                        },
                    ],
                },
            ],
        })
    })

    describe("should disallow relative utils imports", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [],
            invalid: [
                {
                    code: "import helper from '../utils/helper'",
                    options: options,
                    errors: [
                        {
                            messageId: "restrictedImport",
                            data: {
                                importPath: "../utils/helper",
                                pattern: "/^\\.\\./utils/.*/",
                            },
                        },
                    ],
                },
            ],
        })
    })

    describe("should allow import when no pattern matches", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [
                {
                    code: "import path from 'path'",
                    options: options,
                },
            ],
            invalid: [],
        })
    })

    describe("should allow import if patterns array is empty", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [
                {
                    code: "import path from '@internal/test'",
                    options: [[]],
                },
            ],
            invalid: [],
        })
    })

    // ✅ NEW TEST CASE - no options provided
    describe("should allow import when no options are provided (cover fallback path)", () => {
        ruleTester.run("pattern-restricted-import", rule, {
            valid: [
                {
                    code: "import anything from '@internal/test'",
                    // ❌ no options key
                },
            ],
            invalid: [],
        })
    })
})
