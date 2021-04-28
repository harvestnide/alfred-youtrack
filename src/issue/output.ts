import {IssueResponseSchema} from "../lib/youtrackRequestFactory";
import * as util from "../lib/util";

const alfy = require('alfy');

type IssueOutput = (matchedIssues: IssueResponseSchema[], addMatchField?: boolean) => void;

const fallbackItem: AlfredItem = {
    title: "Nothing found...",
    subtitle: "Do you want to launch YouTrack instead?",
    arg: process.env.baseUrl ?? '',
    text: {copy: process.env.baseUrl ?? ''},
    quicklookurl: process.env.baseUrl ?? '',
    icon: {path: alfy.icon.warning}
}

export const issueOutput: IssueOutput = (matchedIssues, addMatchField = false) => {
    let outputIssueArray = matchedIssues.map((issue: IssueResponseSchema) => formatIssuePayload(issue, addMatchField));
    if (!outputIssueArray.length) {
        outputIssueArray = [fallbackItem];
    }
    alfy.output(outputIssueArray, 15);
}

type AlfredItem = {
    uid?: string,
    title: string,
    subtitle?: string,
    arg?: string | number,
    match?: string | null,
    text?: { copy?: string, largetype?: string },
    quicklookurl?: string,
    icon?: { path: string }
};

type FormatIssuePayload = (issue: IssueResponseSchema, addMatchField: boolean) => AlfredItem;

const formatIssuePayload: FormatIssuePayload = (issue, addMatchField) => {
    const title = `${issue.idReadable}: ${issue.summary}`,
        description = util.charTrim(issue.description) ?? 'Issue has no description',
        url = `${process.env.baseUrl}/issue/${issue.idReadable}`;

    return {
        uid: issue.idReadable,
        title: title,
        subtitle: description,
        arg: url,
        match: addMatchField ? `${issue.idReadable} ${issue.summary ?? ''} ${issue.description ?? ''}` : null,
        text: {copy: url, largetype: description},
        quicklookurl: url
    }
}