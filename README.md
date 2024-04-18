# export-secrets-action

Export GitHub Actions secrets as environment variables.

## Usage

Set the JSON of secrets to `secrets`.

```yaml
steps:
  - uses: koyashiro/export-secrets-action@v0.2.0
    with:
      secrets: ${{ toJSON(secrets) }}
```

If you want to downcase secrets starting with `TF_VAR_`, you can use the `downcase-tf-var` option.
For example, a secret like `TF_VAR_EXAMPLE` will be exported as `TF_VAR_example`.

```yaml
steps:
  - uses: koyashiro/export-secrets-action@v0.2.0
    with:
      secrets: ${{ toJSON(secrets) }}
      downcase-tf-var: true
```
