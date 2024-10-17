# Asking GitHub Copilot for IaC with Terraform

**Ask Copilot Chat**:
I need to provision an Azure Kubernetes Service (AKS) cluster along with a Kubernetes service of type LoadBalancer using Terraform. The infrastructure should include the following components:

1. **Azure Resource Group:**
    - Name: `myaksResourceGroup`
    - Location: `Australia East` (or `Australia Southeast` if preferred)

2. **Azure Kubernetes Service (AKS) Cluster:**
    - Name: `myaksCluster`
    - Location: Same as the resource group
    - DNS Prefix: `myaksdns`
    - Default Node Pool:
      - Name: `default`
      - Node Count: 1 (adjustable based on workload)
      - VM Size: `Standard_DS2_v2`
    - Identity: SystemAssigned

3. **Kubernetes Service:**
- Name: `example-loadbalancer`
- Type: `LoadBalancer`
- Selector: `app = "exampleApp"`
- Session Affinity: `None`
- Port Configuration:
  - Name: `http`
  - Protocol: `TCP`
  - Port: 80
    - Target Port: 80

    4. **Outputs:**
        - `client_certificate`: The client certificate from the AKS kube config (sensitive)
        - `kube_config`: The raw kube config from the AKS cluster (sensitive)
        - `load_balancer_ip`: The public IP address of the load balancer

# Prompt pattern:
I need to provision an Azure Kubernetes Service (AKS) cluster along with a Kubernetes service of type LoadBalancer using Terraform. The infrastructure should include the following components:

# Context
I need to provision an Azure Kubernetes Service (AKS) cluster along with a Kubernetes service of type LoadBalancer using Terraform.

# Specific Requirements
The infrastructure should include the following components:
- An AKS cluster with a specified node count and VM size.
- A Kubernetes service of type LoadBalancer to expose an application.

# Requires Review and Update
**Review the output**: Most often than not, the output will look correct, but it is essential to review the output to ensure it meets the requirements. You will still need to update certain aspects of the code to ensure it meets your goal.
