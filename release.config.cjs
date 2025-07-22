module.exports = {
    branches: ["master"],
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                releaseRules: [
                    { type: "fix", release: "patch" },
                    { type: "build", release: "patch" },
                    { type: "chore", release: "patch" },
                    { type: "ci", release: "patch" },
                    { type: "docs", release: "patch" },
                    { type: "style", release: "patch" },
                    { type: "perf", release: "patch" }
                ]
            }
        ],
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "CHANGELOG.md"
            }
        ],
        "@semantic-release/npm",
        "@semantic-release/github",
        [
            "@semantic-release/git",
            {
                assets: ["package.json", "CHANGELOG.md"],
                message:
                    "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ]
    ]
}
