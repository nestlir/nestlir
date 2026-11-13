# Portfolio security notes

This is a static client-side portfolio hosted on GitHub Pages.

- No secrets, private keys, or server credentials belong in this repository's browser bundle.
- External links opened in a new tab must use `rel="noopener noreferrer"`.
- Contact currently uses a `mailto:` link. No message is submitted to or stored by this site.
- Any future contact API must be introduced as a separate server-side service with server-side validation, abuse controls, rate limiting, privacy notice and secret management.
- Dependencies are reviewed through the lockfile and automated dependency alerts; never execute unreviewed agent skills or scripts as part of the build.
- The architecture diagram marks API and database as future boundaries rather than active services.
