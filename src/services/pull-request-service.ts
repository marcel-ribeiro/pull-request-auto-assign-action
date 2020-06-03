import * as github from '@actions/github'
import * as core from '@actions/core'
import { Context } from '@actions/github/lib/context'
import { Config } from '../models/config';

export class PullRequestService {
    private client: github.GitHub
    private context: Context
    private config: Config

    constructor(client: github.GitHub, context: Context, config: Config) {
        this.client = client
        this.context = context
        this.config = config
    }

    async performAssignment() {
        if (!this.context.payload.pull_request) {
            throw new Error('the webhook payload does not exist')
        }
        const {draft, number} = this.context.payload.pull_request

        if (draft) {
            core.info(
                'Skips the process to add assignees because PR type is still in draft'
            )
            return
        }


        try {
            const assignees = this.config.assignees
            if (assignees.length > 0) {
                await this.addAssignees(assignees)
                core.info(`Added assignees to PR #${number}: ${assignees.join(', ')}`)
            }
        } catch (error) {
            core.warning(error.message)
        }
    }

    async addAssignees(assignees: string[]): Promise<void> {
        const {owner, repo, number: issue_number} = this.context.issue
        const result = await this.client.issues.addAssignees({
            owner,
            repo,
            issue_number,
            assignees,
        })
        core.debug(JSON.stringify(result))
    }
}
