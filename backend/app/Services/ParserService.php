<?php

namespace App\Services;

use App\Models\Analysis;
use App\Models\AgentTask;
use App\Models\Contract;

/**
 * TSK-003: Pengekstrak kode dan pembuat AST.
 * Mem-parsing kode Solidity dan mengekstrak struktur:
 * Contracts, Interfaces, Libraries, Structs, Enums, Events,
 * Errors, Modifiers, Functions, State Variables.
 */
class ParserService extends BaseAgentService
{
    public function agentName(): string
    {
        return 'Parser';
    }

    public function execute(Analysis $analysis, AgentTask $task): array
    {
        $this->log($task, 'Starting Solidity parsing...');

        $contracts = $analysis->contracts;
        $output = [];

        foreach ($contracts as $contract) {
            $ast = $this->extractAST($contract);
            $contract->update(['ast_json' => $ast]);
            $output[] = [
                'contract_id'   => $contract->id,
                'contract_name' => $contract->contract_name,
                'ast'           => $ast,
            ];
        }

        $this->log($task, 'Parsing completed for ' . count($contracts) . ' contracts.');

        return [
            'contracts_parsed' => count($contracts),
            'ast_data'         => $output,
        ];
    }

    private function extractAST(Contract $contract): array
    {
        $code = $contract->source_code ?? '';

        return [
            'pragmas'     => $this->extractPragmas($code),
            'imports'     => $this->extractImports($code),
            'contracts'   => $this->extractContracts($code),
            'interfaces'  => $this->extractInterfaces($code),
            'libraries'   => $this->extractLibraries($code),
            'structs'     => $this->extractStructs($code),
            'enums'       => $this->extractEnums($code),
            'events'      => $this->extractEvents($code),
            'errors'      => $this->extractErrors($code),
            'modifiers'   => $this->extractModifiers($code),
            'functions'   => $this->extractFunctions($code),
            'state_vars'  => $this->extractStateVariables($code),
        ];
    }

    private function extractPragmas(string $code): array
    {
        preg_match_all('/pragma\s+solidity\s+([^;]+);/', $code, $m);
        return $m[1] ?? [];
    }

    private function extractImports(string $code): array
    {
        preg_match_all('/import\s+["\']([^"\']+)["\']\s*;/', $code, $m);
        return $m[1] ?? [];
    }

    private function extractContracts(string $code): array
    {
        preg_match_all('/contract\s+(\w+)\s*(?:is\s+([^{]+))?\{/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'inherits' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractInterfaces(string $code): array
    {
        preg_match_all('/interface\s+(\w+)\s*\{/', $code, $m);
        return $m[1] ?? [];
    }

    private function extractLibraries(string $code): array
    {
        preg_match_all('/library\s+(\w+)\s*\{/', $code, $m);
        return $m[1] ?? [];
    }

    private function extractStructs(string $code): array
    {
        preg_match_all('/struct\s+(\w+)\s*\{([^}]+)\}/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'body' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractEnums(string $code): array
    {
        preg_match_all('/enum\s+(\w+)\s*\{([^}]+)\}/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'body' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractEvents(string $code): array
    {
        preg_match_all('/event\s+(\w+)\s*\(([^)]*)\)\s*;/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'params' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractErrors(string $code): array
    {
        preg_match_all('/error\s+(\w+)\s*\(([^)]*)\)\s*;/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'params' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractModifiers(string $code): array
    {
        preg_match_all('/modifier\s+(\w+)\s*\(([^)]*)\)/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = ['name' => $name, 'params' => trim($m[2][$i] ?? '')];
        }
        return $result;
    }

    private function extractFunctions(string $code): array
    {
        preg_match_all('/function\s+(\w+)\s*\(([^)]*)\)\s*(public|private|internal|external)?\s*(view|pure|payable)?\s*(?:returns\s*\(([^)]*)\))?/', $code, $m);
        $result = [];
        foreach ($m[1] as $i => $name) {
            $result[] = [
                'name'       => $name,
                'params'     => trim($m[2][$i] ?? ''),
                'visibility' => $m[3][$i] ?? 'public',
                'modifier'   => $m[4][$i] ?? '',
                'returns'    => trim($m[5][$i] ?? ''),
            ];
        }
        return $result;
    }

    private function extractStateVariables(string $code): array
    {
        preg_match_all('/(uint\d*|int\d*|bool|address|string|bytes\d*|mapping\s*\([^)]+\))\s+(public|private|internal)?\s*(\w+)\s*;/', $code, $m);
        $result = [];
        foreach ($m[3] as $i => $name) {
            $result[] = [
                'name'       => $name,
                'type'       => $m[1][$i] ?? '',
                'visibility' => $m[2][$i] ?? 'internal',
            ];
        }
        return $result;
    }
}
