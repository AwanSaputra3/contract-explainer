import os
import sys
import json
from dotenv import load_dotenv
from crewai import Crew, Process
from agents import ContractAgents
from tasks import ContractTasks

# Load Laravel's .env file to get OPENROUTER_API_KEY
# The .env file is one directory up in backend/
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend', '.env'))
load_dotenv(dotenv_path=env_path)

def analyze_contract(contract_code):
    agents = ContractAgents()
    tasks = ContractTasks()

    # Initialize Agents
    parser = agents.parser_agent()
    security = agents.security_agent()
    gas = agents.gas_agent()

    # Initialize Tasks
    parse_task = tasks.parse_task(parser, contract_code)
    security_task = tasks.security_task(security, contract_code)
    gas_task = tasks.gas_task(gas, contract_code)

    # Form the Crew
    crew = Crew(
        agents=[parser, security, gas],
        tasks=[parse_task, security_task, gas_task],
        process=Process.sequential,
        verbose=False # Set to True for debugging in console
    )

    # Start the analysis
    result = crew.kickoff()

    # Format the final output to send back to Laravel
    # (Since CrewAI kickoff returns a string/object, we capture it as raw report)
    # We can also capture individual task outputs if needed.
    output = {
        "status": "success",
        "parser_output": parse_task.output.raw_output if hasattr(parse_task, 'output') else "N/A",
        "security_output": security_task.output.raw_output if hasattr(security_task, 'output') else "N/A",
        "gas_output": gas_task.output.raw_output if hasattr(gas_task, 'output') else "N/A",
        "final_summary": str(result)
    }

    print(json.dumps(output))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Contract code required"}))
        sys.exit(1)
    
    contract_code = sys.argv[1]
    
    # Simple check if input is a file path (for local testing)
    if os.path.isfile(contract_code):
        with open(contract_code, 'r') as f:
            contract_code = f.read()

    analyze_contract(contract_code)
