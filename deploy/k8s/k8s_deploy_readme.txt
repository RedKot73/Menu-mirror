# Kustomize-based Deployment Guide for Kubernetes

This guide explains how to deploy the application and its database to a Kubernetes cluster (local or remote) using the Kustomize setup.

## Directory Structure Overview

The Kubernetes manifests are organized using Kustomize to manage different environments:

- `base/`: Contains the common, "template" Kubernetes manifests (`k8s-deployment.yaml`, `k8s-service.yaml`). The deployment manifest now expects `/healthz` and `/ready` endpoints for probes.
- `overlays/`: Contains environment-specific configurations.
  - `dev/`: Configuration for the development environment. Deploys from the `development` branch.
  - `prod/`: Configuration for the production environment. Deploys from the `main` branch (manual trigger).
  - `local/`: Configuration for local development and testing (e.g., with Minikube, Docker Desktop).

---

## Automated Deployment with GitLab CI/CD

Deployment to `development` and `production` environments is automated via `.gitlab-ci.yml`.

### How it Works
1.  **Trigger**: A push to the `development` branch (for dev) or a manual trigger on the `main` branch (for prod).
2.  **Build**: Docker images for the app and database are built and pushed to the GitLab registry.
3.  **Deploy**:
    - The CI job selects the correct overlay (`dev` or `prod`).
    - It creates a temporary `.env` file (e.g., `dev.env`) inside the overlay directory, populating it with `DB_USER` and `DB_PASSWORD` from GitLab's CI/CD variables.
    - It uses `kustomize edit set image` to update the image tag to the one just built.
    - It runs `kubectl apply -k <overlay-path>` to deploy all resources. `kustomize` builds the final manifests, creating the `s5-db-credentials` secret from the `.env` file and the `s5-app-config` ConfigMap with environment-specific settings.

You do not need to run `kubectl` commands manually for these environments.

---

## Local Deployment and Testing

For local development, you'll use the `local` overlay, which sources its secrets from the main `.env` file in the project root.

### Step 1: Prepare Local Secrets
- Edit the `.env` file in the root of the project.
- Fill in the `DB_USER`, `DB_PASSWORD`, `DB_NAME`, etc., for your local database instance. The `local` Kustomize overlay is configured to read this file.

### Step 2: Preview the Generated Manifests (Optional but Recommended)
Before applying any changes, you can preview all the Kubernetes resources that Kustomize will generate. This is a great way to verify that your secrets and configurations are correct.
```shell
# Run this from the project root
kubectl kustomize deploy/k8s/overlays/local
```
This command will print the final `Deployment`, `Service`, `ConfigMap`, and `Secret` manifests to the console.

### Step 3: Deploy the Database Cluster
This step is the same as before. It sets up the CloudNativePG PostgreSQL cluster.
```shell
# Apply the cluster definition
kubectl apply -f deploy/k8s/k8s-db-cluster.yaml

# Wait for the cluster to become healthy (may take a few minutes)
# Look for "Cluster in healthy state"
kubectl get cluster -n default
```

### Step 4: Deploy the Application using the `local` Overlay
This single command deploys the application and its configuration.
```shell
# This command builds the final manifests from 'base' and the 'local' overlay
# and applies them to your cluster.
kubectl apply -k deploy/k8s/overlays/local/
```
**Note**: For this to work, your application image must be available in your local cluster's Docker daemon. You may need to build it locally and, if using Minikube, run `minikube image load <your-image-name>:<tag>`.

### Step 5: Verification and Access
```shell
# Check that the deployment was successful and the pod is ready
kubectl get deployments

# Forward the service port to your local machine to access the app
kubectl port-forward service/s5-server-service 8080:80
```
You can now access the application at `http://localhost:8080`.

---

## Cleaning Up Resources

To remove the deployed resources from your local cluster:

```shell
# Delete the application resources created by the 'local' overlay
kubectl delete -k deploy/k8s/overlays/local/

# Delete the database cluster separately
kubectl delete -f deploy/k8s/k8s-db-cluster.yaml
```
