# Pull Request auto-assign
Github action to auto-assigns Pull Requests based on configurations

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/pull-request-auto-assign-action@v1.1.0
with:
  who-to-greet: 'Mona the Octocat'
