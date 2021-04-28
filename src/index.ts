import {issueFetch, IssueResponseSchema} from "./lib/youtrackRequestFactory";
import {issueOutput} from "./issue/output";
import process from "process";

const alfy = require('alfy');

if (!process.env.apiToken || !process.env.baseUrl) {
    alfy.output([{
        title: "Error: Some configs are missing!",
        valid: false,
        icon: {path: alfy.icon.warning},
    }])

    process.exit(0);
}

(async () => {
    const searchMode = process.argv[process.argv.length - 1] !== '--query';
    try {
        const issues: IssueResponseSchema[] = await issueFetch(searchMode ? null : alfy.input);
        issueOutput(issues, searchMode);
    } catch (e) {
        e = e as Error;
        alfy.output([{
            icon: {path: alfy.icon.warning},
            title: 'Something went wrong',
            subtitle: 'Do you want to open youtrack instead?',
            arg: process.env.baseUrl ?? '',
            text: {copy: `${e.name} ${e.message}`, largetype: `${e.name} ${e.message}`}
        }]);
    }
})();