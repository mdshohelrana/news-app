module.exports = {
    preset: '@vue/cli-plugin-unit-jest',    
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!**/node_modules/**"
    ],
    coverageReporters: [
        "html",
        "text-summary"
    ]
}
