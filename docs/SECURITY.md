# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in rkk-next, please:

1. **DO NOT** open a public issue
2. Email: [your-email@example.com] (replace with your actual email)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will acknowledge your email within 48 hours and provide a detailed response within 7 days.

## Security Best Practices

When using rkk-next:

- Always validate user input before using in meta tags
- Sanitize content before injecting into JSON-LD
- Use `noIndex` on pages with sensitive information
- Enable HTTPS in production
- Use security headers (available in `rkk-next/performance/securityHeaders`)

Thank you for helping keep rkk-next secure!
