import { RuleTester } from "@typescript-eslint/rule-tester"
import rule from "."

const ruleTester = new RuleTester()

describe("no-else rule", () => {
    describe("allows simple if without else", () => {
        ruleTester.run("no-else", rule, {
            valid: [
                {
                    code: `
                    if (x > 0) {
                        doSomething()
                    }
                    `,
                },
            ],
            invalid: [],
        })
    })

    describe("allows if-else-if chain", () => {
        ruleTester.run("no-else", rule, {
            valid: [
                {
                    code: `
                    if (x > 0) {
                        doSomething()
                    } else if (x < 0) {
                        doSomethingElse()
                    }
                    `,
                },
            ],
            invalid: [],
        })
    })

    describe("allows early return pattern", () => {
        ruleTester.run("no-else", rule, {
            valid: [
                {
                    code: `
                    if (x > 0) {
                        return 'yes'
                    }
                    return 'no'
                    `,
                },
            ],
            invalid: [],
        })
    })

    describe("disallows else block", () => {
        ruleTester.run("no-else", rule, {
            valid: [],
            invalid: [
                {
                    code: `
                    if (x > 0) {
                        doSomething()
                    } else {
                        doSomethingElse()
                    }
                    `,
                    errors: [{ messageId: "noElse" }],
                },
            ],
        })
    })

    describe("disallows nested else block", () => {
        ruleTester.run("no-else", rule, {
            valid: [],
            invalid: [
                {
                    code: `
                    if (x > 0) {
                        doSomething()
                    } else {
                        if (y < 0) {
                            doSomethingElse()
                        }
                    }
                    `,
                    errors: [{ messageId: "noElse" }],
                },
            ],
        })
    })
})