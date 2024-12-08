from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Union
from collections import defaultdict

# Node Model
class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Union[str, int, float, bool]]

# Edge Model
class Edge(BaseModel):
    source: str
    target: str
    weight: float = Field(1.0, ge=0, description="Edge weight must be non-negative.")

# Pipeline Model
class Pipeline(BaseModel):
    name: str
    nodes: List[Node]
    edges: List[Edge]

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to check if the graph is a DAG
def is_dag(adjacency_list, all_nodes):
    visited = set()
    rec_stack = set()

    def dfs(node):
        if node in rec_stack:
            return False  # Cycle detected
        if node in visited:
            return True

        visited.add(node)
        rec_stack.add(node)

        for neighbor in adjacency_list.get(node, []):
            if not dfs(neighbor):
                return False

        rec_stack.remove(node)
        return True

    return all(dfs(node) for node in all_nodes if node not in visited)

# Function to compute topological sort
def topological_sort(adjacency_list, all_nodes):
    indegree = {node: 0 for node in all_nodes}
    for source, targets in adjacency_list.items():
        for target in targets:
            indegree[target] += 1

    queue = [node for node in all_nodes if indegree[node] == 0]
    result = []

    while queue:
        current = queue.pop(0)
        result.append(current)

        for neighbor in adjacency_list.get(current, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(result) != len(all_nodes):
        raise HTTPException(status_code=400, detail="Graph contains a cycle.")

    return result

# POST Endpoint to process the pipeline
@app.post("/api/pipelines/")
def process_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Validate that all edges reference valid nodes
    node_ids = {node.id for node in nodes}
    edge_nodes = {edge.source for edge in edges} | {edge.target for edge in edges}
    missing_nodes = edge_nodes - node_ids

    if missing_nodes:
        raise HTTPException(status_code=400, detail=f"Invalid edges: Missing nodes {missing_nodes}")

    # Build adjacency list for graph processing
    adjacency_list = defaultdict(list)
    for edge in edges:
        adjacency_list[edge.source].append(edge.target)

    # Check if the graph is a DAG
    is_graph_dag = is_dag(adjacency_list, node_ids)

    # Compute topological sort if the graph is a DAG
    if is_graph_dag:
        execution_order = topological_sort(adjacency_list, node_ids)
    else:
        execution_order = None

    # Return pipeline information
    return {
        "message": "Pipeline processed successfully",
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_graph_dag,
        "execution_order": execution_order,
    }

# GET Endpoint for testing
@app.get("/")
def root():
    return {"message": "API is up and running"}
