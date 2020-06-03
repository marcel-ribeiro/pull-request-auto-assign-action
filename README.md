# Pull Request auto-assign
Github action to auto-assigns Pull Requests based on configurations

## Inputs

### `assignee`

**Required** Github username the PR should be assigned to.

## Example usage
Create a yml file in your github repo under the path `.github/workflows/pr-auto-assignment.yml` with the following content:

```
on: [pull_request]

jobs:
  pull-request-auto-assign:
    runs-on: ubuntu-latest
    name: Pull Request auto-assignment
    steps:
      - uses: marcel-ribeiro/pull-request-auto-assign-action@1.0.3-SNAPSHOT
        with:
          assignee: 'marcel-ribeiro'
```
