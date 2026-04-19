#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path


REGISTER_ASSIGN_RE = re.compile(r"^(r\d+)\s*=\s*r0\.__d;\s*$")
FACTORY_START_RE = re.compile(r"^(r\d+)\s*=\s*function\((.*?)\)\s*\{")
MODULE_ID_RE = re.compile(r"^(r\d+)\s*=\s*(-?\d+);\s*$")
DEPS_RE = re.compile(r"^(r\d+)\s*=\s*(\[.*\]|new Array\(0\));\s*$")
REGISTER_CALL_RE = re.compile(
    r"^(r\d+)\s*=\s*(r\d+)\.bind\((r\d+)\)\((r\d+),\s*(r\d+),\s*(r\d+)\);\s*$"
)


@dataclass
class MetroModule:
    module_id: int
    deps: list[int]
    register_var: str
    factory_var: str
    params: str
    factory_lines: list[str]
    start_line: int
    end_line: int


def strip_comments_and_strings(line: str) -> str:
    result: list[str] = []
    in_single = False
    in_double = False
    escaped = False
    idx = 0

    while idx < len(line):
        ch = line[idx]
        nxt = line[idx + 1] if idx + 1 < len(line) else ""

        if escaped:
            escaped = False
            idx += 1
            continue

        if ch == "\\" and (in_single or in_double):
            escaped = True
            idx += 1
            continue

        if not in_double and ch == "'" and not in_single:
            in_single = True
            idx += 1
            continue
        if in_single and ch == "'":
            in_single = False
            idx += 1
            continue

        if not in_single and ch == '"' and not in_double:
            in_double = True
            idx += 1
            continue
        if in_double and ch == '"':
            in_double = False
            idx += 1
            continue

        if not in_single and not in_double and ch == "/" and nxt == "/":
            break

        if not in_single and not in_double:
            result.append(ch)

        idx += 1

    return "".join(result)


def brace_delta(line: str) -> int:
    code = strip_comments_and_strings(line)
    return code.count("{") - code.count("}")


def parse_deps(raw: str) -> list[int]:
    if raw == "new Array(0)":
        return []
    return [int(item.strip()) for item in raw.strip("[]").split(",") if item.strip()]


def find_function_end(lines: list[str], start_index: int) -> int:
    balance = 0
    for index in range(start_index, len(lines)):
        balance += brace_delta(lines[index])
        if index > start_index and balance == 0:
            return index
    raise ValueError(f"Unclosed function starting at line {start_index + 1}")


def parse_modules(lines: list[str]) -> list[MetroModule]:
    modules: list[MetroModule] = []
    index = 0

    while index < len(lines):
        register_match = REGISTER_ASSIGN_RE.match(lines[index].strip())
        if not register_match:
            index += 1
            continue

        register_var = register_match.group(1)
        if index + 1 >= len(lines):
            break

        factory_match = FACTORY_START_RE.match(lines[index + 1].strip())
        if not factory_match:
            index += 1
            continue

        factory_var = factory_match.group(1)
        params = factory_match.group(2)
        function_end = find_function_end(lines, index + 1)
        factory_lines = lines[index + 1 : function_end + 1]

        tail = [line.strip() for line in lines[function_end + 1 : function_end + 8]]
        if len(tail) < 3:
            index = function_end + 1
            continue

        module_id_match = MODULE_ID_RE.match(tail[0])
        deps_match = DEPS_RE.match(tail[1])
        register_call_match = REGISTER_CALL_RE.match(tail[2])

        if not (module_id_match and deps_match and register_call_match):
            index = function_end + 1
            continue

        if register_call_match.group(2) != register_var or register_call_match.group(4) != factory_var:
            index = function_end + 1
            continue

        if register_call_match.group(5) != module_id_match.group(1) or register_call_match.group(6) != deps_match.group(1):
            index = function_end + 1
            continue

        modules.append(
            MetroModule(
                module_id=int(module_id_match.group(2)),
                deps=parse_deps(deps_match.group(2)),
                register_var=register_var,
                factory_var=factory_var,
                params=params,
                factory_lines=factory_lines,
                start_line=index + 1,
                end_line=function_end + 1,
            )
        )

        index = function_end + 4

    return modules


def write_modules(modules: list[MetroModule], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    manifest = []
    width = max(4, len(str(max((module.module_id for module in modules), default=0))))

    for module in modules:
        file_name = f"module_{module.module_id:0{width}d}.js"
        file_path = out_dir / file_name
        header = [
            f"// moduleId: {module.module_id}",
            f"// deps: {json.dumps(module.deps)}",
            f"// lines: {module.start_line}-{module.end_line}",
            "",
        ]
        file_path.write_text("\n".join(header + module.factory_lines) + "\n", encoding="utf-8")
        manifest.append(
            {
                "moduleId": module.module_id,
                "deps": module.deps,
                "file": file_name,
                "startLine": module.start_line,
                "endLine": module.end_line,
            }
        )

    manifest_path = out_dir / "modules.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Split a decompiled Hermes Metro bundle into per-module JS files."
    )
    parser.add_argument("input_file", type=Path, help="Path to the decompiled bundle JS file")
    parser.add_argument("output_dir", type=Path, help="Directory for extracted module files")
    args = parser.parse_args()

    source = args.input_file.read_text(encoding="utf-8")
    lines = source.splitlines()
    modules = parse_modules(lines)
    write_modules(modules, args.output_dir)

    print(f"Extracted {len(modules)} modules to {args.output_dir}")


if __name__ == "__main__":
    main()
