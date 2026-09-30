HotelServices — Kubernetes Setup
This README explains how HotelServices is deployed on a KIND Kubernetes cluster using Deployments, Services, Secrets, Persistent Volumes, and Horizontal Pod Autoscaling.
Kubernetes Architecture
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

1. KIND Cluster
Create the KIND cluster using cluster.yml:
kind create cluster --config cluster.yml

Example cluster.yml:
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30000
        hostPort: 8000
        protocol: TCP

  - role: worker
  - role: worker

The 30000 NodePort is mapped to port 8000 on the host machine.
The application can be accessed through:
http://localhost:8000

2. Secrets
Create the namespace and application secrets:
kubectl apply -f secret.yml

The Secret contains:
DB_USERNAME
DB_PASSWORD
DB_NAME
HOST_NAME
REDIS_SERVER_URL

The HotelService Deployment reads these values using secretKeyRef.
3. Persistent Volumes
MySQL and Redis use persistent storage.
Apply:
kubectl apply -f persistentVolume.yml

Storage:
MySQL → mysql-pvc
Redis → redis-pvc

The PVCs are mounted into their respective containers so that data is not stored only inside the container filesystem.
4. Deploy HotelService
The HotelService Deployment runs two replicas:
replicas: 2

Apply:
kubectl apply -f hotelservice-deployment.yml

Application image:
alokmishra773/hotelservice:latest

Container port:
3000

The two replicas allow Kubernetes to distribute requests between multiple HotelService pods.
5. Deploy MySQL
Apply:
kubectl apply -f mysql-deployment.yml

MySQL runs as one pod and uses:
mysql-pvc

HotelService connects to MySQL using the Kubernetes Service name:
mysql:3306

6. Deploy Redis
Apply:
kubectl apply -f redis-deployment.yml

Redis runs as one pod and uses:
redis-pvc

HotelService connects to Redis using:
redis:6379

7. Kubernetes Services
Apply:
kubectl apply -f services.yml

The project contains three Services:
Service	Type	Port	Purpose
hotelservice	NodePort	30000	External access
mysql	ClusterIP	3306	Internal database
redis	ClusterIP	6379	Internal Redis


Only HotelService is exposed outside the cluster.
MySQL and Redis remain accessible only inside the Kubernetes cluster.
8. Horizontal Pod Autoscaler
Apply:
kubectl apply -f hpa.yml

HPA configuration:
Minimum replicas: 2
Maximum replicas: 5
CPU target: 70%

The HPA automatically adjusts the number of HotelService pods based on CPU utilization.
Low Traffic
    |
    v
2 Pods
    |
    | CPU increases
    v
More Pods
    |
    v
Maximum 5 Pods

9. Complete Deployment
Apply the Kubernetes files in this order:
kubectl apply -f secret.yml

kubectl apply -f persistentVolume.yml

kubectl apply -f mysql-deployment.yml
kubectl apply -f redis-deployment.yml
kubectl apply -f hotelservice-deployment.yml

kubectl apply -f services.yml

kubectl apply -f hpa.yml

10. Kubernetes Files
k8s/
├── cluster.yml
├── secret.yml
├── persistentVolume.yml
├── hotelservice-deployment.yml
├── mysql-deployment.yml
├── redis-deployment.yml
├── services.yml
└── hpa.yml

11. Useful Commands
Check all pods:
kubectl get pods -n hotel-service-ns

Check deployments:
kubectl get deployments -n hotel-service-ns

Check services:
kubectl get services -n hotel-service-ns

Check persistent volumes:
kubectl get pv

Check persistent volume claims:
kubectl get pvc -n hotel-service-ns

Check HPA:
kubectl get hpa -n hotel-service-ns

View HotelService logs:
kubectl logs -f deployment/hotelservice -n hotel-service-ns

12. Access the Application
HotelService is exposed through NodePort:
NodePort: 30000
Host Port: 8000

Access the application using:
http://localhost:8000

The request flow is:
Browser
   |
   | localhost:8000
   v
KIND Node
   |
   | NodePort :30000
   v
HotelService Service
   |
   +------------+------------+
   |                         |
   v                         v
HotelService Pod       HotelService Pod

13. Internal Communication
HotelService communicates with MySQL and Redis through Kubernetes Services.
HotelService
      |
      +------ mysql:3306
      |
      +------ redis:6379

MySQL and Redis do not need to be exposed using NodePort because they are only required by the application internally.
14. Overall Architecture
                         KIND Cluster
                              |
                +-------------+-------------+
                |                           |
                v                           v
        NodePort :30000                Internal Network
                |                           |
                v                    +------+------+
        HotelService Service         |             |
                |                    v             v
          +-----+-----+            MySQL         Redis
          |           |             :3306         :6379
          v           v               |             |
       Pod 1        Pod 2             v             v
          |           |           mysql-pvc      redis-pvc
          +-----+-----+
                |
                v
              HPA
          2 → 5 replicas

Summary
- KIND → Local Kubernetes cluster
- Deployment → Manages HotelService, MySQL, and Redis pods
- Service → Provides networking between Kubernetes components
- NodePort → Exposes HotelService to the host machine
- ClusterIP → Keeps MySQL and Redis internal
- Secret → Stores database and Redis configuration
- PersistentVolume/PVC → Provides persistent storage
- HPA → Automatically scales HotelService based on CPU utilization