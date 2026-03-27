# Security Policy

## Supported Versions

Security fixes are applied to the latest published release on npm.

## Reporting a Vulnerability

Please do not open a public GitHub issue for suspected security problems.

Use GitHub's private vulnerability reporting flow for this repository if it is enabled. If it is not, contact the maintainer privately before opening a public issue.

Include:

- A short description of the issue
- Steps to reproduce it
- Any proof-of-concept, logs, or affected versions
- Your preferred contact information for follow-up

Reports will be reviewed privately and coordinated before public disclosure whenever possible.

## Scope Notes

This package is local-first. The optional AI entry point can send sanitized error text and optional context to OpenAI when you configure an API key. If you believe that behavior could expose sensitive data in your application, please include your usage details in the report.
