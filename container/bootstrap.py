#!/usr/bin/env python3
import os
import subprocess
from shutil import which

def setup_secrets():
    """
    Reads kebab-case secrets from /run/secrets/, transforms them to
    UPPER_SNAKE_CASE, and exports them as environment variables.
    """
    secrets_dir = "/run/secrets"
    if not os.path.isdir(secrets_dir):
        print(f"Secrets directory not found: {secrets_dir}")
        return

    # List of kebab-case secret files the application expects in /run/secrets/
    expected_secrets = [
        "sendgrid-api-key",
        "sender-email",
        "destination-email",
    ]

    for secret_name in expected_secrets:
        secret_file_path = os.path.join(secrets_dir, secret_name)
        
        if os.path.exists(secret_file_path):
            print(f"Found secret: {secret_name}")
            with open(secret_file_path, "r") as f:
                secret_value = f.read().strip()
                # Transform kebab-case to UPPER_SNAKE_CASE for the env var
                env_var_name = secret_name.upper().replace("-", "_")
                os.environ[env_var_name] = secret_value
        else:
            env_var_name = secret_name.upper().replace("-", "_")
            if env_var_name not in os.environ:
                print(f"Warning: Secret file not found for {secret_name} and environment variable {env_var_name} is not set.")


def main():
    """Main bootstrap script."""
    # Load secrets into environment variables
    setup_secrets()

    # Start Gunicorn with Uvicorn workers in the background
    # The Gunicorn process will inherit the environment variables.
    gunicorn_args = [
        "/usr/local/bin/gunicorn",
        "--config",
        "/app/backend/gunicorn.conf.py",
        "main:app",
    ]
    subprocess.Popen(gunicorn_args, cwd="/app/backend")

    # Exec into Caddy to make it the main process
    caddy_executable = which("caddy")
    if caddy_executable:
        os.execv(
            caddy_executable,
            [
                "caddy",
                "run",
                "--config",
                "/etc/caddy/Caddyfile",
            ],
        )
    else:
        print("Error: 'caddy' executable not found.")
        exit(1)


if __name__ == "__main__":
    main()
