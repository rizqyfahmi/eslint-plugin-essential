import { RuleTester } from "@typescript-eslint/rule-tester"
import rule from "."

const options = [
    {
        allowPattern: "^\\*?\\s*((TODO|FIXME|NOTE|BUG|HACK|OPTIMIZE|REVIEW|SECURITY):|@(public|private|deprecated))",
    },
] as const

const ruleTester = new RuleTester({})
describe("pattern-comment rule", () => {
    describe("should allow TODO comment", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [
                {
                    code: "// TODO: refactor this",
                    options: options,
                },
            ],
            invalid: [],
        })
    })

    describe("should allow @public block comment", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [
                {
                    code: "/* @public This is public */",
                    options,
                },
            ],
            invalid: [],
        })
    })

    describe("should allow @deprecated JSDoc", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [
                {
                    code: "/** @deprecated Use another function */",
                    options,
                },
            ],
            invalid: [],
        })
    })

    describe("should report normal line comment", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [],
            invalid: [
                {
                    code: "// Just a normal comment",
                    options,
                    errors: [
                        {
                            messageId: "unexpectedComment",
                            data: {
                                pattern: options[0].allowPattern,
                            },
                        },
                    ],
                },
            ],
        })
    })

    describe("should report normal block comment", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [],
            invalid: [
                {
                    code: "/* Random block comment */",
                    options,
                    errors: [
                        {
                            messageId: "unexpectedComment",
                        },
                    ],
                },
            ],
        })
    })

    describe("should report JSDoc without allowed tag", () => {
        ruleTester.run("pattern-comment", rule, {
            valid: [],
            invalid: [
                {
                    code: "/** Some random JSDoc */",
                    options,
                    errors: [
                        {
                            messageId: "unexpectedComment",
                        },
                    ],
                },
            ],
        })
    })
})
