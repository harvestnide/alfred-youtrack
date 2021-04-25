import {issueFetch, IssueResponseSchema} from "./lib/youtrackRequestFactory";
import {issueOutput} from "./issue/output";

const alfy = require('alfy');

(async () => {
    const searchMode = process.argv[process.argv.length - 1] !== '--query';
    const issues: IssueResponseSchema[] = await issueFetch(searchMode ? null : alfy.input);

    issueOutput(issues, searchMode);
})();