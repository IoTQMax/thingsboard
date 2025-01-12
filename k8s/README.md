# Kubernetes resources configuration for Effi.ai Microservices

This folder containing scripts and Kubernetes resources configurations to run Effi.ai in Microservices mode.

## Prerequisites

Effi.ai Microservices run on the Kubernetes cluster.
You need to have a Kubernetes cluster, and the kubectl command-line tool must be configured to communicate with your cluster.
If you do not have a cluster already, you can create one by using [Minikube](https://kubernetes.io/docs/setup/minikube), 
or you can choose any other available [Kubernetes cluster deployment solutions](https://kubernetes.io/docs/setup/pick-right-solution/).

### Enable ingress addon

By default ingress addon is disabled in the Minikube, and available only in cluster providers.
To enable ingress, please execute the following command:

`
$ minikube addons enable ingress
` 

## Installation

Before performing initial installation you can configure the type of database to be used with Effi.ai and the type of deployment.
To set database type change the value of `DATABASE` variable in `.env` file to one of the following:

- `postgres` - use PostgreSQL database;
- `hybrid` - use PostgreSQL for entities database and Cassandra for timeseries database;

**NOTE**: According to the database type corresponding kubernetes resources will be deployed (see `postgres.yml`, `cassandra.yml` for details).

To set deployment type change the value of `DEPLOYMENT_TYPE` variable in `.env` file to one of the following:

- `basic` - startup with a single instance of Zookeeper, Kafka and Redis;
- `high-availability` - startup with Zookeeper, Kafka, and Redis in cluster modes;

**NOTE**: According to the deployment type corresponding kubernetes resources will be deployed (see the content of the directories `./basic` and `./high-availability` for details).

Execute the following command to run the installation:

`
$ ./k8s-install-tb.sh --loadDemo
`

Where:

- `--loadDemo` - optional argument. Whether to load additional demo data.

## Running

Execute the following command to deploy third-party resources:

`
$ ./k8s-deploy-thirdparty.sh
`

Type **'yes'** when prompted, if you are running Effi.ai in `high-availability` `DEPLOYMENT_TYPE` for the first time and don't have configured Redis cluster.

Execute the following command to deploy resources:

`
$ ./k8s-deploy-resources.sh
`

After a while when all resources will be successfully started you can open `http://{your-cluster-ip}` in your browser (for ex. `http://192.168.99.101`).
You should see the Effi.ai login page.

Use the following default credentials:

- **System Administrator**: sysadmin@effi.ai / sysadmin

If you installed DataBase with demo data (using `--loadDemo` flag) you can also use the following credentials:

- **Tenant Administrator**: tenant@effi.ai / tenant
- **Customer User**: customer@effi.ai / customer

In case of any issues, you can examine service logs for errors.
For example to see Effi.ai node logs execute the following commands:

1) Get the list of the running tb-node pods:

`
$ kubectl get pods -l app=tb-node
`

2) Fetch logs of the tb-node pod:

`
$ kubectl logs -f [tb-node-pod-name]
`

Where:

- `tb-node-pod-name` - tb-node pod name obtained from the list of the running tb-node pods.

Or use `kubectl get pods` to see the state of all the pods.
Or use `kubectl get services` to see the state of all the services.
Or use `kubectl get deployments` to see the state of all the deployments.
See [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) command reference for details.

Execute the following command to delete all Effi.ai microservices:

`
$ ./k8s-delete-resources.sh
`

Execute the following command to delete all third-party microservices:

`
$ ./k8s-delete-thirdparty.sh
`

Execute the following command to delete all resources (including database):

`
$ ./k8s-delete-all.sh
`

## Upgrading

In case when database upgrade is needed, execute the following commands:

```
$ ./k8s-delete-resources.sh
$ ./k8s-upgrade-tb.sh --fromVersion=[FROM_VERSION]
$ ./k8s-deploy-resources.sh
```

Where:

- `FROM_VERSION` - from which version upgrade should be started. See [Upgrade Instructions](https://thingsboard.io/docs/user-guide/install/upgrade-instructions) for valid `fromVersion` values.
