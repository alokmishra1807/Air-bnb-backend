# HotelServices — Kubernetes Setup

This README explains how HotelServices is deployed on a KIND (Kubernetes in Docker) cluster using Deployments, Services, Secrets, Persistent Volumes, and Horizontal Pod Autoscaling (HPA).

## Kubernetes Architecture

```text
                         Host Machine
                              |
                       localhost:8000
                              |
                         NodePort :30000
                              |
                              v
                    HotelService Service
                              |
                    +---------+---------+
                    |                   |
                    v                   v
              HotelService Pod    HotelService Pod
                    |                   |
                    +---------+---------+
                              |
                 +------------+------------+
                 |                         |
                 v                         v
           MySQL Service             Redis Service
              :3306                     :6379
                 |                         |
                 v                         v
             MySQL Pod                 Redis Pod
                 |                         |
            mysql-pvc                  redis-pvc
```

## Directory Structure

```text
.
├── cluster.yml
├── hostel-service-deployment.yml
├── hpa.yml
├── mysql-deployment.yml
├── persistanVolumeClaim.yml
├── persistentVolume.yml
├── redis-deployment.yml
├── secret.yml
└── services.yml
```

## Setup and Deployment Guide

### 1. KIND Cluster Setup

Create the KIND cluster using `cluster.yml`:

```bash
kind create cluster --config cluster.yml
```

`cluster.yml` configuration overview:
- Control plane port mapping: Port 30000 inside the container is mapped to host port 8000.
- Nodes: 1 control-plane node and 2 worker nodes.
- Access point: http://localhost:8000

### 2. Configuration and Secrets

Apply the application secret containing environment variables and sensitive configuration data:

```bash
kubectl apply -f secret.yml
```

Secret key references:
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- HOST_NAME
- REDIS_SERVER_URL

The `hostel-service-deployment.yml` loads these variables using `secretKeyRef`.

### 3. Persistent Storage

Provision persistent storage for MySQL and Redis using persistent volumes and volume claims:

```bash
kubectl apply -f persistentVolume.yml
kubectl apply -f persistanVolumeClaim.yml
```

Storage allocations:
- MySQL: `mysql-pvc`
- Redis: `redis-pvc`

### 4. Deploy Backend Services and Databases

#### MySQL Database

```bash
kubectl apply -f mysql-deployment.yml
```

- Replicas: 1
- Volume Mount: `mysql-pvc`
- Internal Target: `mysql:3306`

#### Redis Cache

```bash
kubectl apply -f redis-deployment.yml
```

- Replicas: 1
- Volume Mount: `redis-pvc`
- Internal Target: `redis:6379`

#### Hotel Service Application

```bash
kubectl apply -f hostel-service-deployment.yml
```

- Image: `alokmishra773/hotelservice:latest`
- Port: 3000
- Default Replicas: 2

### 5. Deploy Kubernetes Services

Expose internal and external network endpoints:

```bash
kubectl apply -f services.yml
```

| Service | Type | Port | Description |
| :--- | :--- | :--- | :--- |
| **hotelservice** | NodePort | 30000 | Exposes application externally on host port 8000 |
| **mysql** | ClusterIP | 3306 | Internal communication only |
| **redis** | ClusterIP | 6379 | Internal communication only |

### 6. Horizontal Pod Autoscaler (HPA)

Enable dynamic autoscaling based on CPU utilization:

```bash
kubectl apply -f hpa.yml
```

- Minimum Replicas: 2
- Maximum Replicas: 5
- CPU Target: 70%

```text
Low Traffic ---> 2 Pods
                  |
        (CPU > 70% increase)
                  |
High Traffic --> Up to 5 Pods
```

## Complete Deployment Sequence

Apply all Kubernetes files in the following order:

```bash
kubectl apply -f secret.yml
kubectl apply -f persistentVolume.yml
kubectl apply -f persistanVolumeClaim.yml
kubectl apply -f mysql-deployment.yml
kubectl apply -f redis-deployment.yml
kubectl apply -f hostel-service-deployment.yml
kubectl apply -f services.yml
kubectl apply -f hpa.yml
```

## Request Flow and Application Access

### External Access

Access the application at `http://localhost:8000`.

```text
Browser (localhost:8000)
    |
KIND Node (Port 30000)
    |
HotelService Service (NodePort)
    |
HotelService Pods (Load balanced)
```

### Internal Communication

```text
HotelService Pods
    |-- mysql:3306 (MySQL Service) ---> MySQL Pod
    |-- redis:6379 (Redis Service) ---> Redis Pod
```

## Useful Commands

Check active resources within the namespace (`hotel-service-ns`):

```bash
# Check Pods
kubectl get pods -n hotel-service-ns

# Check Deployments
kubectl get deployments -n hotel-service-ns

# Check Services
kubectl get services -n hotel-service-ns

# Check Storage
kubectl get pv
kubectl get pvc -n hotel-service-ns

# Check HPA Status
kubectl get hpa -n hotel-service-ns

# View Application Logs
kubectl logs -f deployment/hotelservice -n hotel-service-ns
```