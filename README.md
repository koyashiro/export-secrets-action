# export-secrets-action

Export GitHub Actions secrets as environment variables.

## Usage

```yml
steps:
  - uses: koyashiro/export-secrets-action@v0.1.0
    with:
      secrets: ${{ toJSON(secrets) }}
```
