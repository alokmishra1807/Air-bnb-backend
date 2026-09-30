# HotelServices — Jenkins CI/CD Setup

This README explains how the Jenkins node is configured, how Docker Hub and environment credentials are stored, and how the GitHub webhook triggers the Jenkins pipeline.

## CI/CD Flow

```text
GitHub
   |
   | Push to main
   v
GitHub Webhook
   |
   v
Jenkins
   |
   +---- Clone Repository
   |
   +---- Build Docker Image
   |
   +---- Push Image to Docker Hub
   |
   +---- Prepare .env
   |
   +---- Deploy with Docker Compose
   |
   +---- Run Sequelize Migrations
```

## 1. Jenkins Node

The pipeline runs on a Jenkins node with the label:

```groovy
agent { label "dev" }
```

Create/configure a Jenkins node with the label:

```text
dev
```

The node should have:

- Git
- Docker
- Docker Compose
- Jenkins configured to execute shell commands

The Jenkins user must also have permission to run Docker commands.

## 2. Jenkins Pipeline

The pipeline is stored in the repository as a `Jenkinsfile`.

The main stages are:

1. Clone repository
2. Build Docker image
3. Push image to Docker Hub
4. Prepare environment
5. Deploy using Docker Compose
6. Run Sequelize migrations

The application is located inside:

```text
HotelServices/
```

The Docker image is built using:

```bash
docker build -t hotelservice:latest .
```

The image is pushed as:

```text
alokmishra773/hotelservice:latest
```

## 3. Jenkins Credentials

Jenkins Credentials Manager is used to store sensitive information instead of putting passwords directly inside the Jenkinsfile.

Go to:

```text
Jenkins
→ Manage Jenkins
→ Credentials
→ System
→ Global credentials
```

### Docker Hub Credentials

Create a credential of type:

```text
Username with password
```

Example:

```text
ID: YOUR_DOCKERHUB_CREDENTIAL_ID
Username: Docker Hub username
Password: Docker Hub password/token
```

The pipeline uses it with:

```groovy
withCredentials([
    usernamePassword(
        credentialsId: "YOUR_DOCKERHUB_CREDENTIAL_ID",
        usernameVariable: "DOCKERHUB_USER",
        passwordVariable: "DOCKERHUB_PASS"
    )
])
```

Jenkins then provides these values only during the pipeline step.

## 4. Environment File Credential

The application's `.env` file is also stored as a Jenkins credential.

Create a credential of type:

```text
Secret file
```

Upload the required `.env` file.

Example credential ID:

```text
YOUR_ENV_FILE_CREDENTIAL_ID
```

The pipeline retrieves it using:

```groovy
withCredentials([
    file(
        credentialsId: 'YOUR_ENV_FILE_CREDENTIAL_ID',
        variable: 'ENV_FILE'
    )
])
```

It then creates the `.env` file inside `HotelServices`:

```bash
rm -f .env
cp "$ENV_FILE" .env
chmod 600 .env
```

The `.env` file does not need to be stored in GitHub.

## 5. Jenkins Job

Create a Jenkins Pipeline job.

Configure the pipeline to use the repository:

```text
https://github.com/alokmishra1807/Air-bnb-backend.git
```

Branch:

```text
main
```

The Jenkinsfile is taken from the repository.

## 6. GitHub Webhook

The GitHub repository can trigger Jenkins automatically whenever code is pushed.

In GitHub:

```text
Repository
→ Settings
→ Webhooks
→ Add webhook
```

Set the Jenkins webhook URL:

```text
http://<JENKINS_HOST>/github-webhook/
```

Choose:

```text
Content type: application/json
```

Select:

```text
Just the push event
```

Then create the webhook.

## 7. Jenkins Webhook Configuration

In the Jenkins job configuration, enable the GitHub hook trigger:

```text
Build Triggers
→ GitHub hook trigger for GITScm polling
```

Now the flow becomes:

```text
Developer pushes code
        |
        v
GitHub
        |
        | Webhook
        v
Jenkins
        |
        v
Pipeline starts
```

## 8. Deployment

During deployment Jenkins runs:

```bash
docker compose pull
docker compose up -d
```

The Docker Compose configuration starts the application and its required services.

After deployment, Sequelize migrations are executed:

```bash
docker compose exec -T app     npx sequelize-cli db:migrate
```

## 9. Complete Pipeline

```text
Git Push
   ↓
GitHub Webhook
   ↓
Jenkins Node (dev)
   ↓
Clone Repository
   ↓
Build Docker Image
   ↓
Login to Docker Hub
   ↓
Push Image
   ↓
Load .env from Jenkins Credential
   ↓
Docker Compose Pull
   ↓
Docker Compose Up
   ↓
Sequelize Migration
   ↓
Deployment Complete
```

## Credentials Summary

| Credential | Jenkins Type | Purpose |
|---|---|---|
| Docker Hub | Username with password | Login and push Docker image |
| `.env` | Secret file | Provide application environment variables |

Sensitive credentials should be stored in Jenkins Credentials Manager rather than committed to the repository.
