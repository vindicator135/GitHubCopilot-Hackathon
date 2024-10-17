# Prompt for Diagram
```plaintext
I need a mermaid flowchart diagram that visualizes the data flow from the initiation of the workflow (Azure Logic Apps) to the data storage (Azure SQL Database) and subsequent data visualization (Power BI). Azure Logic Apps serves as the orchestrator, triggering Azure Data Factory pipelines based on a pre-defined schedule. Azure Data Factory is responsible for making calls to the GitHub Copilot REST API, processing the returned data, and then storing it in Azure SQL Database. Power BI then accesses this data to create reports and dashboards for visualization.
```



## Additional Prompt
```plaintext
Let's add other data sources apart from the GitHub Copilot ReST API.

One of the data that I need to collect will come from Azure DevOps for gathering Pull request throughput.

Another data source is from SOnarQube where I need to get the Code Smells and Code Coverage per project.

PLease update the flowchart diagram to incorporate these additional data sources.
```

```mermaid
flowchart LR
    LogicApp(Azure Logic Apps) --> |Trigger| ADF(Azure Data Factory)
    ADF --> |Call API| CopilotAPI{GitHub Copilot REST API}
    ADF --> |Call API| DevOpsAPI{Azure DevOps API}
    ADF --> |Call API| SonarQubeAPI{SonarQube API}
    CopilotAPI --> |Return Data| ADF
    DevOpsAPI --> |Return Data| ADF
    SonarQubeAPI --> |Return Data| ADF
    ADF --> |Transform & Store Data| SQLDB(Azure SQL Database)
    SQLDB --> |Access Data| BI(Power BI)
    BI --> |Visualize Data| Reports

    classDef azure fill:#007FFF,stroke:#333,stroke-width:2px;
    class LogicApp,ADF,SQLDB,Reports,CopilotAPI,DevOpsAPI,SonarQubeAPI azure;
