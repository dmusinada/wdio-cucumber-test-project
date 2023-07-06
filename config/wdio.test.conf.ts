import { config as baseConfig } from "../wdio.conf.js"

export const config = Object.assign(baseConfig, {
    environment: "Dev",
    baseUrl: "https://www.securian.com/insights-tools/retirement-calculator.html"
})