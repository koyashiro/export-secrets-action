# export-secrets-action

Export GitHub Actions secrets as environment variables.

## Usage

```yml
steps:
  - uses: koyashiro/export-secrets-action@v0.0.0
    with:
      secrets: ${{ toJSON(secrets) }}
```
