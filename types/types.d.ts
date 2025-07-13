import { Linter } from "eslint"

declare module "eslint" {
    namespace Linter {
        interface Config {
            parserOptions?: Linter.ParserOptions;
        }
    }
}