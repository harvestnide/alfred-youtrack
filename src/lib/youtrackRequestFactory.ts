import process from "process";

const alfy = require('alfy');

export type IssueResponseSchema = {
    idReadable: string,
    project: string | null,
    summary: string | null,
    description: string | null,
}

const issueFields = ['idReadable', 'project', 'summary', 'description', 'reporter', 'resolved'];

const generateIssueRequestOptions = (query: string | null) => {
    return {
        headers: {'Authorization': `Bearer ${process.env.apiToken}`},
        query: [['fields', issueFields.join(',')], ['query', query]]
    };
}

export const issueFetch = async (query: string | null = null) => {
    return await alfy.fetch(`${process.env.baseUrl}/api/issues`, generateIssueRequestOptions(query))
}