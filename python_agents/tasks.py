from crewai import Task

class ContractTasks:
    def parse_task(self, agent, contract_code):
        return Task(
            description=f'Analyze the following Solidity smart contract code:\n\n{contract_code}\n\n1. Identify all public and external functions.\n2. Summarize the state variables.\n3. Outline the high-level architecture.',
            expected_output='A JSON or structured summary of the contract structure including functions, modifiers, and state variables.',
            agent=agent
        )

    def security_task(self, agent, contract_code):
        return Task(
            description=f'Review the contract code for security flaws:\n\n{contract_code}\n\nPay special attention to:\n- Reentrancy vulnerabilities\n- Unprotected selfdestruct\n- Access control issues\n- Integer overflow/underflow (if applicable)',
            expected_output='A detailed list of security vulnerabilities with their severity (Low, Medium, High, Critical) and a brief explanation for each.',
            agent=agent
        )

    def gas_task(self, agent, contract_code):
        return Task(
            description=f'Review the contract code for gas optimization opportunities:\n\n{contract_code}\n\nLook for:\n- Unnecessary storage reads/writes\n- Inefficient loops\n- Variable packing opportunities',
            expected_output='A list of actionable gas optimization suggestions.',
            agent=agent
        )
