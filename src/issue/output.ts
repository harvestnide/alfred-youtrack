import {IssueResponseSchema} from "../lib/youtrackRequestFactory";
import * as util from "../lib/util";

const alfy = require('alfy');

type IssueOutput = (matchedIssues: IssueResponseSchema[], addMatchField?: boolean ) => void;

export const issueOutput: IssueOutput = (matchedIssues, addMatchField = false) => {
    alfy.output(
        matchedIssues.map((issue: IssueResponseSchema) => formatIssuePayload(issue, addMatchField)),
        15
    );
}

type AlfredItem = { title: string, subtitle: string, arg: string | number, match: string | null };

type FormatIssuePayload = (issue: IssueResponseSchema, addMatchField: boolean) => AlfredItem;

const formatIssuePayload: FormatIssuePayload = (issue, addMatchField) => ({
    title: `${issue.idReadable}: ${issue.summary}`,
    subtitle: util.charTrim(issue.description) ?? 'Issue has no description',
    arg: `${process.env.baseUrl}/issue/${issue.idReadable}`,
    match: addMatchField ? `${issue.idReadable} ${issue.summary ?? ''} ${issue.description ?? ''}` : null
})