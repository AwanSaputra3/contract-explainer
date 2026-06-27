import os
from crewai import Agent, LLM

# Setup OpenRouter LLM wrapper
def get_llm():
    return LLM(
        model="openrouter/google/gemini-2.5-flash",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        max_tokens=2000
    )

class ContractAgents:
    def __init__(self):
        self.llm = get_llm()

    def parser_agent(self):
        return Agent(
            role='Smart Contract Parser',
            goal='Analyze and extract the Abstract Syntax Tree (AST), structure, and core functions of the given Solidity smart contract.',
            backstory='You are a highly experienced reverse engineer and compiler architect who specializes in Ethereum Virtual Machine (EVM) architecture. You break down complex code into understandable structures.',
            verbose=False,
            allow_delegation=False,
            llm=self.llm
        )

    def security_agent(self):
        return Agent(
            role='Smart Contract Security Auditor',
            goal='Identify security vulnerabilities, reentrancy risks, and access control flaws in the smart contract.',
            backstory='You are a legendary Web3 security auditor. You have prevented billions of dollars in hacks by finding subtle bugs that others miss. You are extremely thorough and paranoid about security.',
            verbose=False,
            allow_delegation=False,
            llm=self.llm
        )

    def gas_agent(self):
        return Agent(
            role='Gas Optimization Expert',
            goal='Find opportunities to reduce gas costs and optimize the computational efficiency of the smart contract.',
            backstory='You are an expert in EVM opcodes and gas mechanics. You know every trick in the book to save Wei on transactions, from packing storage variables to optimizing memory allocation.',
            verbose=False,
            allow_delegation=False,
            llm=self.llm
        )
