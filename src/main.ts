import * as core from '@actions/core'
import * as github from '@actions/github'
import { PullRequestService } from './services/pull-request-service'
import { Config } from './models/config'

async function run() {
  try {
    const token = core.getInput('repo-token', { required: true })
    const assignee = core.getInput('assignee', { required: true })

    const client = new github.GitHub(token)
    const config: Config = { assignees: [assignee] }
    const pullRequestService = new PullRequestService(
      client,
      github.context,
      config
    )
    await pullRequestService.performAssignment()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
