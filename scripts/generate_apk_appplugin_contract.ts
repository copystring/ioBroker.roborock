import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

type Evidence = { file: string; line: number; sha256: string };
type ExportedConstantContract = {
	name: string;
	valueExpression: string;
	methodName: string;
	evidence: Evidence;
};
type NativePropContract = {
	name: string;
	type: string;
	evidence: Evidence;
};
type BubblingEventContract = {
	topLevelName: string;
	bubbled: string;
	captured: string;
	skipBubbling: boolean;
	evidence: Evidence;
};
type DirectEventContract = {
	topLevelName: string;
	registrationName: string;
	evidence: Evidence;
};
type ViewManagerCommandContract = {
	name: string;
	value: number;
	evidence: Evidence;
};
type ViewManagerConstantValue =
	| string
	| number
	| boolean
	| null
	| ViewManagerConstantValue[]
	| { [name: string]: ViewManagerConstantValue };
type ViewManagerConstantContract = {
	name: string;
	value: ViewManagerConstantValue;
	evidence: Evidence;
};
type PackageContract = {
	expression: string;
	javaClass: string;
	variant: number | null;
	nativeModuleClasses: string[];
	viewManagerClasses: string[];
	evidence: Evidence | null;
};

type OnDemandViewManagerRegistration = {
	viewName: string;
	javaClass: string;
	filePath: string;
	source: string;
	evidence: Evidence;
};

const repositoryRoot = process.cwd();
const apkDirectory = path.join(repositoryRoot, ".apk");
const generatedDirectory = path.join(repositoryRoot, "src", "apppluginHost", "generated");
const outputPath = path.join(generatedDirectory, "apk-appplugin-host-contract.json");
const documentationPath = path.join(repositoryRoot, "docs", "generated", "AppPlugin_APK_Host.md");

function slash(value: string): string {
	return value.replaceAll("\\", "/");
}

function relativeToRepository(filePath: string): string {
	return slash(path.relative(repositoryRoot, filePath));
}

function sha256(content: string | Buffer): string {
	return crypto.createHash("sha256").update(content).digest("hex");
}

function lineAt(source: string, index: number): number {
	return source.slice(0, index).split(/\r?\n/u).length;
}

function evidence(filePath: string, source: string, index = 0): Evidence {
	return {
		file: relativeToRepository(filePath),
		line: lineAt(source, index),
		sha256: sha256(fs.readFileSync(filePath)),
	};
}

function findDecompiledRoot(): string {
	const candidates = fs.readdirSync(apkDirectory, { withFileTypes: true })
		.filter(entry => entry.isDirectory() && entry.name.includes("_decompiled"))
		.map(entry => path.join(apkDirectory, entry.name))
		.sort();
	if (candidates.length !== 1) {
		throw new Error(`Genau ein dekompiliertes APK-Verzeichnis erwartet, gefunden: ${candidates.length}`);
	}
	return candidates[0];
}

function walkJavaFiles(root: string): string[] {
	const result: string[] = [];
	const pending = [root];
	while (pending.length) {
		const current = pending.pop();
		if (!current) continue;
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const fullPath = path.join(current, entry.name);
			if (entry.isDirectory()) pending.push(fullPath);
			else if (entry.isFile() && entry.name.endsWith(".java")) result.push(fullPath);
		}
	}
	return result.sort();
}

function parseImports(source: string): Map<string, string> {
	const imports = new Map<string, string>();
	for (const match of source.matchAll(/^import\s+([A-Za-z0-9_$.]+);/gmu)) {
		const javaClass = match[1];
		imports.set(javaClass.slice(javaClass.lastIndexOf(".") + 1), javaClass);
	}
	return imports;
}

function packageName(source: string): string {
	return source.match(/^package\s+([A-Za-z0-9_$.]+);/mu)?.[1] ?? "";
}

function resolveJavaClass(className: string, source: string, decompiledRoot: string): string {
	const cleaned = className.replace(/\$/gu, ".");
	if (cleaned.includes(".")) {
		const candidate = path.join(decompiledRoot, ...cleaned.split(".")) + ".java";
		if (fs.existsSync(candidate)) return cleaned;
	}
	const imported = parseImports(source).get(cleaned);
	if (imported) return imported;
	const ownPackage = packageName(source);
	const local = ownPackage ? `${ownPackage}.${cleaned}` : cleaned;
	const localPath = path.join(decompiledRoot, ...local.split(".")) + ".java";
	return fs.existsSync(localPath) ? local : cleaned;
}

function javaClassPath(javaClass: string, decompiledRoot: string): string {
	return path.join(decompiledRoot, ...javaClass.split(".")) + ".java";
}

function splitTopLevel(source: string): string[] {
	const values: string[] = [];
	let depth = 0;
	let start = 0;
	let quote: '"' | "'" | undefined;
	let escaped = false;
	for (let index = 0; index < source.length; index++) {
		const character = source[index];
		if (quote) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === quote) quote = undefined;
			continue;
		}
		if (character === '"' || character === "'") quote = character;
		else if (character === "(" || character === "[" || character === "{") depth++;
		else if (character === ")" || character === "]" || character === "}") depth--;
		else if (character === "," && depth === 0) {
			values.push(source.slice(start, index).trim());
			start = index + 1;
		}
	}
	values.push(source.slice(start).trim());
	return values.filter(Boolean);
}

function methodBody(source: string, methodName: string): string | undefined {
	const signature = new RegExp(`\\b${methodName}\\s*\\([^)]*\\)\\s*\\{`, "u").exec(source);
	if (!signature) return undefined;
	const openBrace = source.indexOf("{", signature.index);
	let depth = 0;
	for (let index = openBrace; index < source.length; index++) {
		if (source[index] === "{") depth++;
		else if (source[index] === "}") {
			depth--;
			if (depth === 0) return source.slice(openBrace + 1, index);
		}
	}
	return undefined;
}

function extractExportedConstantsFromMethod(
	filePath: string,
	source: string,
	methodName: string,
): ExportedConstantContract[] {
	const signature = new RegExp(`\\b${methodName}\\s*\\([^)]*\\)\\s*\\{`, "u").exec(source);
	if (!signature) return [];
	const body = methodBody(source, methodName);
	if (body === undefined) return [];
	const bodyIndex = source.indexOf(body, signature.index);
	const constants = new Map<string, ExportedConstantContract>();
	for (const match of body.matchAll(/\.put\(\s*"([^"]+)"\s*,\s*(.+)\);\s*$/gmu)) {
		const index = bodyIndex + (match.index ?? 0);
		constants.set(match[1], {
			name: match[1],
			valueExpression: match[2].trim(),
			methodName,
			evidence: evidence(filePath, source, index),
		});
	}
	for (const match of body.matchAll(
		/\breturn\s+[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+\(\s*"([^"]+)"\s*,\s*(.+)\);\s*$/gmu,
	)) {
		const index = bodyIndex + (match.index ?? 0);
		constants.set(match[1], {
			name: match[1],
			valueExpression: match[2].trim(),
			methodName,
			evidence: evidence(filePath, source, index),
		});
	}
	return [...constants.values()];
}

function effectiveExportedConstants(
	filePath: string,
	source: string,
	inherited: Array<{ filePath: string; source: string }>,
): ExportedConstantContract[] {
	const chain = [{ filePath, source }, ...inherited];
	const effective = new Map<string, ExportedConstantContract>();
	for (const methodName of ["getConstants", "getTypedExportedConstants"]) {
		const implementation = chain.find(candidate => methodBody(candidate.source, methodName) !== undefined);
		if (!implementation) continue;
		for (const constant of extractExportedConstantsFromMethod(
			implementation.filePath,
			implementation.source,
			methodName,
		)) {
			effective.set(constant.name, constant);
		}
	}
	return [...effective.values()];
}

function switchCase(source: string, variant: number | null): string {
	if (variant === null || !source.includes("switch(")) return source;
	const markers = [...source.matchAll(/\b(case\s+(\d+)|default)\s*:/gu)];
	const wanted = markers.find(marker => Number(marker[2]) === variant)
		?? markers.find(marker => marker[1] === "default");
	if (!wanted || wanted.index === undefined) return "";
	const start = wanted.index + wanted[0].length;
	const next = markers.find(marker => (marker.index ?? 0) > (wanted.index ?? 0));
	return source.slice(start, next?.index ?? source.length);
}

function instantiatedClasses(source: string, ownerSource: string, decompiledRoot: string): string[] {
	const ignored = new Set(["ArrayList", "HashMap", "Object", "ReactModuleInfo", "RuntimeException", "StringBuilder"]);
	const result = new Set<string>();
	for (const match of source.matchAll(/\bnew\s+([A-Za-z_$][A-Za-z0-9_$.]*)\s*\(/gu)) {
		if (ignored.has(match[1])) continue;
		const javaClass = resolveJavaClass(match[1], ownerSource, decompiledRoot);
		const sourcePath = javaClassPath(javaClass, decompiledRoot);
		if (fs.existsSync(sourcePath)) result.add(javaClass);
	}
	return [...result].sort();
}

function instantiatedViewManagerClasses(
	source: string,
	ownerSource: string,
	decompiledRoot: string,
): string[] {
	const direct = instantiatedClasses(source, ownerSource, decompiledRoot);
	const providerProducts = direct.flatMap(javaClass => {
		const sourcePath = javaClassPath(javaClass, decompiledRoot);
		if (!fs.existsSync(sourcePath)) return [];
		const providerSource = fs.readFileSync(sourcePath, "utf8");
		if (!providerSource.includes("implements Provider")) return [];
		const body = methodBody(providerSource, "get");
		return body ? instantiatedClasses(body, providerSource, decompiledRoot) : [];
	});
	return [...new Set([...direct, ...providerProducts])].filter(javaClass => {
		const sourcePath = javaClassPath(javaClass, decompiledRoot);
		if (!fs.existsSync(sourcePath)) return false;
		const candidateSource = fs.readFileSync(sourcePath, "utf8");
		return inheritedSources(candidateSource, decompiledRoot)
			.some(item => item.javaClass === "com.facebook.react.uimanager.ViewManager");
	}).sort();
}

function instantiatedNativeModuleClasses(
	source: string,
	ownerSource: string,
	decompiledRoot: string,
): string[] {
	return instantiatedClasses(source, ownerSource, decompiledRoot).filter(javaClass => {
		const sourcePath = javaClassPath(javaClass, decompiledRoot);
		if (!fs.existsSync(sourcePath)) return false;
		const moduleSource = fs.readFileSync(sourcePath, "utf8");
		return [moduleSource, ...inheritedSources(moduleSource, decompiledRoot).map(item => item.source)]
			.some(candidate => extractModuleName(candidate) !== undefined);
	});
}

function classBlockRange(source: string, className: string): { start: number; end: number } | undefined {
	const declaration = new RegExp(`\\b(?:static\\s+)?class\\s+${className}\\b[^\\{]*\\{`, "u").exec(source);
	if (!declaration) return undefined;
	const openBrace = source.indexOf("{", declaration.index);
	let depth = 0;
	for (let index = openBrace; index < source.length; index++) {
		if (source[index] === "{") depth++;
		else if (source[index] === "}") {
			depth--;
			if (depth === 0) return { start: declaration.index, end: index + 1 };
		}
	}
	throw new Error(`Unvollständiger Java-Klassenblock: ${className}`);
}

function maskSourceExceptRanges(source: string, ranges: Array<{ start: number; end: number }>): string {
	const masked = [...source].map(character => character === "\r" || character === "\n" ? character : " ");
	for (const range of ranges) {
		for (let index = range.start; index < range.end; index++) masked[index] = source[index];
	}
	return masked.join("");
}

function isolatedNestedClassSource(
	source: string,
	classRange: { start: number; end: number },
): string {
	const ranges = [classRange];
	const packageDeclaration = /^package\s+[A-Za-z0-9_$.]+;/mu.exec(source);
	if (packageDeclaration?.index !== undefined) {
		ranges.push({ start: packageDeclaration.index, end: packageDeclaration.index + packageDeclaration[0].length });
	}
	for (const imported of source.matchAll(/^import\s+[A-Za-z0-9_$.]+;/gmu)) {
		if (imported.index !== undefined) ranges.push({ start: imported.index, end: imported.index + imported[0].length });
	}
	return maskSourceExceptRanges(source, ranges);
}

function withoutNestedClassBodies(source: string): string {
	const declarations = [...source.matchAll(/\b(?:static\s+)?class\s+([A-Za-z_$][A-Za-z0-9_$]*)\b[^\{]*\{/gu)];
	const nestedRanges = declarations.slice(1).flatMap(declaration => {
		if (declaration.index === undefined) return [];
		const range = classBlockRange(source.slice(declaration.index), declaration[1]);
		return range
			? [{ start: declaration.index + range.start, end: declaration.index + range.end }]
			: [];
	});
	if (nestedRanges.length === 0) return source;
	const masked = [...source];
	for (const range of nestedRanges) {
		for (let index = range.start; index < range.end; index++) {
			if (masked[index] !== "\r" && masked[index] !== "\n") masked[index] = " ";
		}
	}
	return masked.join("");
}

function resolveOnDemandViewManager(
	viewName: string,
	providerName: string,
	packageSource: string,
	decompiledRoot: string,
): OnDemandViewManagerRegistration {
	const providerClass = resolveJavaClass(providerName, packageSource, decompiledRoot);
	const providerPath = javaClassPath(providerClass, decompiledRoot);
	if (!fs.existsSync(providerPath)) {
		throw new Error(`APK-ViewManager-Provider fehlt: ${providerClass}`);
	}
	const providerSource = fs.readFileSync(providerPath, "utf8");
	const providerBody = methodBody(providerSource, "get");
	const productName = providerBody?.match(/\bnew\s+([A-Za-z_$][A-Za-z0-9_$.]*)\s*\(/u)?.[1];
	if (!productName) throw new Error(`APK-ViewManager-Provider liefert keine Klasse: ${providerClass}`);

	const directClass = resolveJavaClass(productName, providerSource, decompiledRoot);
	const directPath = javaClassPath(directClass, decompiledRoot);
	if (fs.existsSync(directPath)) {
		const source = fs.readFileSync(directPath, "utf8");
		const extractedName = extractViewName(source)?.name;
		if (extractedName && extractedName !== viewName) {
			throw new Error(`APK-ViewManager-Name ${viewName} widerspricht ${directClass}: ${extractedName}`);
		}
		return {
			viewName,
			javaClass: directClass,
			filePath: directPath,
			source,
			evidence: evidence(directPath, source),
		};
	}

	const productSimpleName = productName.split(".").at(-1);
	if (!productSimpleName) throw new Error(`Ungültige APK-ViewManager-Klasse: ${productName}`);
	const ownPackage = packageName(providerSource);
	const packageDirectory = path.join(decompiledRoot, ...ownPackage.split("."));
	const candidates = walkJavaFiles(packageDirectory).flatMap(filePath => {
		const source = fs.readFileSync(filePath, "utf8");
		const range = classBlockRange(source, productSimpleName);
		if (!range) return [];
		const classSource = source.slice(range.start, range.end);
		const declaredName = /\bREACT_CLASS\s*=\s*"([^"]+)"\s*;/u.exec(classSource)?.[1];
		return declaredName === viewName ? [{ filePath, source, range }] : [];
	});
	if (candidates.length !== 1) {
		throw new Error(
			`Genau eine verschachtelte APK-ViewManager-Klasse für ${viewName} erwartet, gefunden: ${candidates.length}`,
		);
	}
	const candidate = candidates[0];
	const ownerClass = extractJavaClass(candidate.source);
	if (!ownerClass) throw new Error(`Java-Eigentümerklasse von ${viewName} fehlt`);
	return {
		viewName,
		javaClass: `${ownerClass}$${productSimpleName}`,
		filePath: candidate.filePath,
		source: isolatedNestedClassSource(candidate.source, candidate.range),
		evidence: evidence(candidate.filePath, candidate.source, candidate.range.start),
	};
}

function extractOnDemandViewManagerRegistrations(
	packageSource: string,
	decompiledRoot: string,
): OnDemandViewManagerRegistration[] {
	const body = methodBody(packageSource, "getViewManagersMap");
	if (!body) return [];
	const registrations = [];
	for (const match of body.matchAll(
		/\.put\(\s*"([^"]+)"\s*,\s*ModuleSpec\.viewManagerSpec\(\s*new\s+([A-Za-z_$][A-Za-z0-9_$.]*)\s*\([^)]*\)\s*\)\s*\)\s*;/gu,
	)) {
		registrations.push(resolveOnDemandViewManager(match[1], match[2], packageSource, decompiledRoot));
	}
	return registrations;
}

function packageContract(
	expression: string,
	hostSource: string,
	decompiledRoot: string,
): PackageContract {
	const constructor = expression.match(/^new\s+([A-Za-z0-9_$.]+)\s*\((.*)\)$/u);
	if (!constructor) throw new Error(`React-Paketausdruck nicht verstanden: ${expression}`);
	const javaClass = resolveJavaClass(constructor[1], hostSource, decompiledRoot);
	const variantText = constructor[2].trim();
	const variant = /^\d+$/u.test(variantText) ? Number(variantText) : null;
	const sourcePath = javaClassPath(javaClass, decompiledRoot);
	if (!fs.existsSync(sourcePath)) {
		return { expression, javaClass, variant, nativeModuleClasses: [], viewManagerClasses: [], evidence: null };
	}
	const source = fs.readFileSync(sourcePath, "utf8");
	const nativeBodies = ["createNativeModules", "getModule"]
		.map(name => methodBody(source, name))
		.filter((body): body is string => body !== undefined)
		.map(body => switchCase(body, variant));
	const viewBodies = ["createViewManagers", "getViewManagersMap"]
		.map(name => methodBody(source, name))
		.filter((body): body is string => body !== undefined)
		.map(body => switchCase(body, variant));
	const onDemandViewManagers = extractOnDemandViewManagerRegistrations(source, decompiledRoot);
	return {
		expression,
		javaClass,
		variant,
		nativeModuleClasses: [...new Set(
			nativeBodies.flatMap(body => instantiatedNativeModuleClasses(body, source, decompiledRoot)),
		)].sort(),
		viewManagerClasses: [...new Set([
			...viewBodies.flatMap(body => instantiatedViewManagerClasses(body, source, decompiledRoot)),
			...onDemandViewManagers.map(viewManager => viewManager.javaClass),
		])].sort(),
		evidence: evidence(sourcePath, source),
	};
}

function extractReactPackages(hostSource: string, decompiledRoot: string): PackageContract[] {
	const declaration = /new\s+ReactPackage\[\]\s*\{([^;]+)\}\);/su.exec(hostSource);
	if (!declaration) throw new Error("Die React-Paketliste wurde im APK-Host nicht gefunden.");
	return splitTopLevel(declaration[1]).map(expression => packageContract(expression, hostSource, decompiledRoot));
}

function extractAutomaticCorePackage(decompiledRoot: string): PackageContract {
	const candidates = walkJavaFiles(path.join(decompiledRoot, "com", "facebook", "react"))
		.map(filePath => ({ filePath, source: fs.readFileSync(filePath, "utf8") }))
		.filter(candidate =>
			candidate.source.includes("implements ReactPackageLogger")
			&& candidate.source.includes('case "UIManager"')
			&& candidate.source.includes("CoreModulesPackage"),
		);
	if (candidates.length !== 1) {
		throw new Error(`Genau ein automatisch installiertes React-Core-Paket erwartet, gefunden: ${candidates.length}`);
	}
	const candidate = candidates[0];
	const body = methodBody(candidate.source, "getModule");
	if (!body) throw new Error("getModule des React-Core-Pakets fehlt");
	const javaClass = extractJavaClass(candidate.source);
	if (!javaClass) throw new Error("Java-Klasse des React-Core-Pakets fehlt");
	return {
		expression: "<ReactInstanceManager:CoreModulesPackage>",
		javaClass,
		variant: null,
		nativeModuleClasses: instantiatedNativeModuleClasses(body, candidate.source, decompiledRoot),
		viewManagerClasses: [],
		evidence: evidence(candidate.filePath, candidate.source, candidate.source.indexOf('case "UIManager"')),
	};
}

function extractReactMethods(source: string): Array<{
	name: string;
	returnType: string;
	parameters: string;
	blockingSynchronous: boolean;
	line: number;
}> {
	const methods = [];
	const pattern = /@ReactMethod(?:\s*\(\s*isBlockingSynchronousMethod\s*=\s*(true|false)\s*\))?\s*(?:@[A-Za-z0-9_$.]+(?:\([^\n]*\))?\s*)*public\s+(?:(?:final|static|abstract|synchronized)\s+)*([A-Za-z0-9_$<>\[\].?]+)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([\s\S]*?)\)\s*(?:\{|;)/gu;
	for (const match of source.matchAll(pattern)) {
		methods.push({
			name: match[3],
			returnType: match[2],
			parameters: match[4].replace(/\s+/gu, " ").trim(),
			blockingSynchronous: match[1] === "true",
			line: lineAt(source, match.index ?? 0),
		});
	}
	return methods.sort((left, right) => left.name.localeCompare(right.name));
}

function extractModuleName(source: string): { name: string; index: number } | undefined {
	const annotation = /@ReactModule\s*\(([^)]*)\)/su.exec(source);
	const annotationName = annotation?.[1].match(/\bname\s*=\s*"([^"]+)"/u)?.[1];
	if (annotation && annotationName) return { name: annotationName, index: annotation.index };
	const getName = /\bString\s+getName\s*\(\s*\)\s*\{\s*return\s+"([^"]+)";/su.exec(source);
	return getName ? { name: getName[1], index: getName.index } : undefined;
}

function canOverrideExistingModule(source: string): boolean {
	const annotation = /@ReactModule\s*\(([^)]*)\)/su.exec(source);
	if (/\bcanOverrideExistingModule\s*=\s*true\b/u.test(annotation?.[1] ?? "")) return true;
	return /\bboolean\s+canOverrideExistingModule\s*\(\s*\)\s*\{\s*return\s+true\s*;/su.test(source);
}

function extractEvents(source: string): string[] {
	return [...new Set([...source.matchAll(/"(RR[A-Za-z0-9_]*Event)"/gu)].map(match => match[1]))].sort();
}

function relatedSamePackageSources(
	source: string,
	decompiledRoot: string,
): Array<{ javaClass: string; source: string }> {
	const ownPackage = packageName(source);
	return instantiatedClasses(source, source, decompiledRoot)
		.filter(javaClass => javaClass.startsWith(`${ownPackage}.`))
		.map(javaClass => ({
			javaClass,
			source: fs.readFileSync(javaClassPath(javaClass, decompiledRoot), "utf8"),
		}));
}

function inheritedSources(
	source: string,
	decompiledRoot: string,
): Array<{ javaClass: string; filePath: string; source: string }> {
	const result: Array<{ javaClass: string; filePath: string; source: string }> = [];
	let currentSource = source;
	const visited = new Set<string>();
	for (let depth = 0; depth < 8; depth++) {
		const superclass = /\bclass\s+[A-Za-z_$][A-Za-z0-9_$]*\s+extends\s+([A-Za-z0-9_$.]+)/u.exec(currentSource)?.[1];
		if (!superclass) break;
		const javaClass = resolveJavaClass(superclass, currentSource, decompiledRoot);
		if (visited.has(javaClass)) break;
		visited.add(javaClass);
		const sourcePath = javaClassPath(javaClass, decompiledRoot);
		if (!fs.existsSync(sourcePath)) break;
		currentSource = fs.readFileSync(sourcePath, "utf8");
		result.push({ javaClass, filePath: sourcePath, source: currentSource });
	}
	return result;
}

function uniqueMethods<T extends { name: string }>(methods: T[]): T[] {
	return [...new Map(methods.map(method => [method.name, method])).values()]
		.sort((left, right) => left.name.localeCompare(right.name));
}

function extractViewName(source: string): { name: string; index: number } | undefined {
	const annotation = /@ReactModule\s*\(([^)]*)\)/su.exec(source);
	const annotationName = annotation?.[1].match(/\bname\s*=\s*"([^"]+)"/u)?.[1];
	if (annotation && annotationName) return { name: annotationName, index: annotation.index };
	const getName = /\bString\s+getName\s*\(\s*\)\s*\{\s*return\s+([^;]+);/su.exec(source);
	if (!getName) return undefined;
	const expression = getName[1].trim();
	const literal = /^"([^"]+)"$/u.exec(expression)?.[1];
	if (literal) return { name: literal, index: getName.index };
	if (!/^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)*$/u.test(expression)) return undefined;
	const constantName = expression.split(".").at(-1);
	if (!constantName) return undefined;
	const constantPattern = new RegExp(
		`\\b(?:public|protected|private)?\\s*static\\s+final\\s+String\\s+${constantName}\\s*=\\s*"([^"]+)"\\s*;`,
		"u",
	);
	const constant = constantPattern.exec(source)?.[1];
	return constant ? { name: constant, index: getName.index } : undefined;
}

function extractProps(source: string): string[] {
	const props = [...source.matchAll(/@ReactProp\s*\([\s\S]*?\bname\s*=\s*"([^"]+)"[\s\S]*?\)/gu)]
		.map(match => match[1]);
	for (const group of source.matchAll(/@ReactPropGroup\s*\([\s\S]*?\bnames\s*=\s*\{([^}]+)\}[\s\S]*?\)/gu)) {
		props.push(...[...group[1].matchAll(/"([^"]+)"/gu)].map(match => match[1]));
	}
	return [...new Set(props)].sort();
}

function parameterJavaType(parameter: string): string {
	const cleaned = parameter
		.replace(/@[A-Za-z0-9_$.]+(?:\([^)]*\))?\s*/gu, "")
		.replace(/\bfinal\s+/gu, "")
		.trim();
	const tokens = cleaned.split(/\s+/u);
	if (tokens.length < 2) throw new Error(`Java-Prop-Parameter nicht verstanden: ${parameter}`);
	tokens.pop();
	return tokens.join(" ");
}

function nativePropType(javaType: string, customType: string | undefined): string {
	if (customType && customType !== "__default_type__") return customType;
	const simpleType = javaType.replace(/<.*>/u, "").split(".").at(-1);
	switch (simpleType) {
		case "boolean":
		case "Boolean":
			return "boolean";
		case "byte":
		case "Byte":
		case "short":
		case "Short":
		case "int":
		case "Integer":
		case "long":
		case "Long":
		case "float":
		case "Float":
		case "double":
		case "Double":
			return "number";
		case "String":
			return "String";
		case "ReadableArray":
			return "Array";
		case "ReadableMap":
			return "Map";
		case "Dynamic":
			return "mixed";
		default:
			throw new Error(`Von der APK verwendeter ReactProp-Typ ist noch nicht abgebildet: ${javaType}`);
	}
}

function extractNativePropsFromSource(filePath: string, source: string): NativePropContract[] {
	const result: NativePropContract[] = [];
	const pattern = /@(ReactProp|ReactPropGroup)\s*\(([\s\S]*?)\)\s*(?:@[A-Za-z0-9_$.]+(?:\([^\n]*\))?\s*)*public\s+(?:(?:final|static|synchronized)\s+)*void\s+[A-Za-z_$][A-Za-z0-9_$]*\s*\(([\s\S]*?)\)\s*\{/gu;
	for (const match of source.matchAll(pattern)) {
		const annotation = match[2];
		const parameters = splitTopLevel(match[3]);
		const type = nativePropType(
			parameterJavaType(parameters.at(-1) ?? ""),
			/\bcustomType\s*=\s*"([^"]+)"/u.exec(annotation)?.[1],
		);
		const names = match[1] === "ReactProp"
			? [/\bname\s*=\s*"([^"]+)"/u.exec(annotation)?.[1]]
			: [...(/\bnames\s*=\s*\{([^}]+)\}/u.exec(annotation)?.[1] ?? "").matchAll(/"([^"]+)"/gu)]
				.map(nameMatch => nameMatch[1]);
		for (const name of names) {
			if (!name) throw new Error(`ReactProp ohne Namen in ${relativeToRepository(filePath)}`);
			result.push({
				name,
				type,
				evidence: evidence(filePath, source, match.index ?? 0),
			});
		}
	}
	return result;
}

function extractShadowNodeClass(
	source: string,
	inherited: Array<{ javaClass: string; filePath: string; source: string }>,
	decompiledRoot: string,
): string | undefined {
	for (const candidate of [{ source }, ...inherited]) {
		const body = methodBody(candidate.source, "getShadowNodeClass");
		const className = body?.match(/\breturn\s+([A-Za-z0-9_$.]+)\.class\s*;/u)?.[1];
		if (className) return resolveJavaClass(className, candidate.source, decompiledRoot);
	}
	return undefined;
}

function extractViewManagerNativeProps(
	filePath: string,
	source: string,
	inherited: Array<{ javaClass: string; filePath: string; source: string }>,
	decompiledRoot: string,
): NativePropContract[] {
	const effective = new Map<string, NativePropContract>();
	const managerChain = [
		...inherited.toReversed(),
		{ javaClass: extractJavaClass(source) ?? "", filePath, source },
	];
	for (const candidate of managerChain) {
		for (const prop of extractNativePropsFromSource(candidate.filePath, candidate.source)) {
			effective.set(prop.name, prop);
		}
	}
	const shadowNodeClass = extractShadowNodeClass(source, inherited, decompiledRoot);
	if (shadowNodeClass) {
		const shadowPath = javaClassPath(shadowNodeClass, decompiledRoot);
		if (!fs.existsSync(shadowPath)) {
			throw new Error(`APK-ShadowNode-Klasse fehlt: ${shadowNodeClass}`);
		}
		const shadowSource = fs.readFileSync(shadowPath, "utf8");
		const shadowChain = [
			...inheritedSources(shadowSource, decompiledRoot).toReversed(),
			{ javaClass: shadowNodeClass, filePath: shadowPath, source: shadowSource },
		];
		for (const candidate of shadowChain) {
			for (const prop of extractNativePropsFromSource(candidate.filePath, candidate.source)) {
				effective.set(prop.name, prop);
			}
		}
	}
	return [...effective.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function extractBubblingEvents(filePath: string, source: string): BubblingEventContract[] {
	const signature = /\bgetExportedCustomBubblingEventTypeConstants\s*\([^)]*\)\s*\{/u.exec(source);
	const body = methodBody(source, "getExportedCustomBubblingEventTypeConstants");
	if (!signature || body === undefined) return [];
	const bodyIndex = source.indexOf(body, signature.index);
	const result: BubblingEventContract[] = [];
	const pattern = /"(top[A-Za-z0-9_]+)"[\s\S]{0,260}?"bubbled"\s*,\s*"([^"]+)"[\s\S]{0,100}?"captured"\s*,\s*"([^"]+)"([\s\S]{0,80}?"skipBubbling"\s*,\s*Boolean\.TRUE)?/gu;
	for (const match of body.matchAll(pattern)) {
		result.push({
			topLevelName: match[1],
			bubbled: match[2],
			captured: match[3],
			skipBubbling: Boolean(match[4]),
			evidence: evidence(filePath, source, bodyIndex + (match.index ?? 0)),
		});
	}
	return result;
}

function extractDirectEvents(filePath: string, source: string): DirectEventContract[] {
	const signature = /\bgetExportedCustomDirectEventTypeConstants\s*\([^)]*\)\s*\{/u.exec(source);
	const body = methodBody(source, "getExportedCustomDirectEventTypeConstants");
	if (!signature || body === undefined) return [];
	const bodyIndex = source.indexOf(body, signature.index);
	const result: DirectEventContract[] = [];
	const pattern = /"(top[A-Za-z0-9_]+)"[\s\S]{0,180}?"registrationName"\s*,\s*"([^"]+)"/gu;
	for (const match of body.matchAll(pattern)) {
		result.push({
			topLevelName: match[1],
			registrationName: match[2],
			evidence: evidence(filePath, source, bodyIndex + (match.index ?? 0)),
		});
	}
	return result;
}

function javaLiteralValue(expression: string): string | number | boolean | null | undefined {
	if (/^"(?:[^"\\]|\\.)*"$/u.test(expression)) return JSON.parse(expression) as string;
	if (/^(?:0x[0-9A-Fa-f]+|-?\d+)$/u.test(expression)) return Number(expression);
	if (expression === "Boolean.TRUE" || expression === "true") return true;
	if (expression === "Boolean.FALSE" || expression === "false") return false;
	if (expression === "null") return null;
	return undefined;
}

function javaViewConstantValue(expression: string): ViewManagerConstantValue | undefined {
	const trimmed = expression.trim();
	const literal = javaLiteralValue(trimmed);
	if (literal !== undefined) return literal;

	const call = /^([A-Za-z_$][A-Za-z0-9_$.]*)\s*\(([\s\S]*)\)$/u.exec(trimmed);
	if (!call) return undefined;
	const parameters = splitTopLevel(call[2]);
	if (parameters.length === 0 || parameters.length % 2 !== 0) return undefined;

	const result: { [name: string]: ViewManagerConstantValue } = {};
	for (let index = 0; index < parameters.length; index += 2) {
		const name = javaLiteralValue(parameters[index]);
		if (typeof name !== "string") return undefined;
		const value = javaViewConstantValue(parameters[index + 1]);
		if (value === undefined) return undefined;
		result[name] = value;
	}
	return result;
}

function effectiveViewConstants(
	filePath: string,
	source: string,
	inherited: Array<{ javaClass: string; filePath: string; source: string }>,
): {
	status: "none" | "parsed" | "unparsed";
	constants: ViewManagerConstantContract[];
} {
	let status: "none" | "parsed" | "unparsed" = "none";
	const effective = new Map<string, ViewManagerConstantContract>();
	const chain = [
		...inherited.toReversed(),
		{ javaClass: extractJavaClass(source) ?? "", filePath, source },
	];
	for (const candidate of chain) {
		const signature = /\bgetExportedViewConstants\s*\([^)]*\)\s*\{/u.exec(candidate.source);
		const body = methodBody(candidate.source, "getExportedViewConstants");
		if (!signature || body === undefined) continue;
		if (!body.includes("super.getExportedViewConstants")) effective.clear();
		if (/\breturn\s+null\s*;/u.test(body)) {
			status = "none";
			continue;
		}
		const bodyIndex = candidate.source.indexOf(body, signature.index);
		const parsed: ViewManagerConstantContract[] = [];
		for (const match of body.matchAll(/\breturn\s+([^;]+)\s*;/gu)) {
			const value = javaViewConstantValue(match[1]);
			if (typeof value !== "object" || value === null || Array.isArray(value)) continue;
			for (const [name, constantValue] of Object.entries(value)) {
				parsed.push({
					name,
					value: constantValue,
					evidence: evidence(candidate.filePath, candidate.source, bodyIndex + (match.index ?? 0)),
				});
			}
		}
		for (const match of body.matchAll(/\.OooO0o\(\s*"([^"]+)"\s*,\s*([^;)]+)\s*\)\s*;/gu)) {
			const value = javaViewConstantValue(match[2]);
			if (value === undefined) continue;
			parsed.push({
				name: match[1],
				value,
				evidence: evidence(candidate.filePath, candidate.source, bodyIndex + (match.index ?? 0)),
			});
		}
		if (parsed.length === 0) {
			status = "unparsed";
			continue;
		}
		for (const constant of parsed) effective.set(constant.name, constant);
		status = "parsed";
	}
	return {
		status,
		constants: [...effective.values()].sort((left, right) => left.name.localeCompare(right.name)),
	};
}

function effectiveViewManagerCommands(
	filePath: string,
	source: string,
	inherited: Array<{ javaClass: string; filePath: string; source: string }>,
): ViewManagerCommandContract[] {
	const effective = new Map<string, ViewManagerCommandContract>();
	const chain = [
		...inherited.toReversed(),
		{ javaClass: extractJavaClass(source) ?? "", filePath, source },
	];
	for (const candidate of chain) {
		const signature = /\bgetCommandsMap\s*\([^)]*\)\s*\{/u.exec(candidate.source);
		const body = methodBody(candidate.source, "getCommandsMap");
		if (!signature || body === undefined) continue;
		if (!body.includes("super.getCommandsMap")) effective.clear();
		const bodyIndex = candidate.source.indexOf(body, signature.index);
		for (const match of body.matchAll(/"([^"]+)"\s*,\s*(0x[0-9A-Fa-f]+|\d+)\b/gu)) {
			effective.set(match[1], {
				name: match[1],
				value: Number(match[2]),
				evidence: evidence(candidate.filePath, candidate.source, bodyIndex + (match.index ?? 0)),
			});
		}
	}
	return [...effective.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function effectiveViewManagerEvents<T extends BubblingEventContract | DirectEventContract>(
	filePath: string,
	source: string,
	inherited: Array<{ javaClass: string; filePath: string; source: string }>,
	methodName: "getExportedCustomBubblingEventTypeConstants" | "getExportedCustomDirectEventTypeConstants",
	extract: (filePath: string, source: string) => T[],
): T[] {
	const effective = new Map<string, T>();
	const chain = [
		...inherited.toReversed(),
		{ javaClass: extractJavaClass(source) ?? "", filePath, source },
	];
	for (const candidate of chain) {
		const body = methodBody(candidate.source, methodName);
		if (body === undefined) continue;
		if (!body.includes(`super.${methodName}`)) effective.clear();
		for (const event of extract(candidate.filePath, candidate.source)) {
			effective.set(event.topLevelName, event);
		}
	}
	return [...effective.values()].sort((left, right) => left.topLevelName.localeCompare(right.topLevelName));
}

function extractNativeMethods(source: string): string[] {
	return [...new Set([...source.matchAll(/\bnative\s+[A-Za-z0-9_$<>\[\].?]+\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/gu)]
		.map(match => match[1]))].sort();
}

function extractJavaClass(source: string): string | undefined {
	const ownPackage = packageName(source);
	const className = /\bclass\s+([A-Za-z_$][A-Za-z0-9_$]*)/u.exec(source)?.[1];
	return className ? `${ownPackage}.${className}` : undefined;
}

function renderDocumentation(contract: {
	apk: { identity: string };
	runtime: { engine: string; bundlePathPattern: string };
	host: { packages: PackageContract[] };
	nativeModules: Array<{
		moduleName: string;
		javaClass: string;
		installedByHost: boolean;
		hostPackageIndices: number[];
		canOverrideExistingModule: boolean;
		methods: unknown[];
		events: string[];
		exportedConstants: ExportedConstantContract[];
	}>;
	viewManagers: Array<{
		viewName: string;
		javaClass: string;
		installedByHost: boolean;
		hostPackageIndices: number[];
		nativeViewClasses: string[];
		props: string[];
		nativeProps: NativePropContract[];
		bubblingEventTypes: BubblingEventContract[];
		directEventTypes: DirectEventContract[];
		commands: ViewManagerCommandContract[];
		viewConstantsStatus: "none" | "parsed" | "unparsed";
		viewConstants: ViewManagerConstantContract[];
		nativeMethods: string[];
	}>;
}): string {
	const lines = [
		"# APK-abgeleiteter AppPlugin-Hostvertrag",
		"",
		"> Diese Datei wird aus der dekompilierten APK erzeugt. Sie beschreibt Belege, nicht den bestehenden ioBroker-Kartenpfad.",
		"",
		`- APK: \`${contract.apk.identity}\``,
		`- JavaScript-Engine: \`${contract.runtime.engine}\``,
		`- Bundlepfad: \`${contract.runtime.bundlePathPattern}\``,
		`- React-Pakete: ${contract.host.packages.length}`,
		`- Native Modules aus der APK-Analyse: ${contract.nativeModules.length}`,
		`- Davon vom Plugin-Host installiert: ${contract.nativeModules.filter(module => module.installedByHost).length}`,
		`- View-Manager: ${contract.viewManagers.length}`,
		"",
		"## React-Pakete",
		"",
		"| Paket | Variante | Native Module | View-Manager |",
		"|---|---:|---:|---:|",
		...contract.host.packages.map(item =>
			`| \`${item.javaClass}\` | ${item.variant ?? "–"} | ${item.nativeModuleClasses.length} | ${item.viewManagerClasses.length} |`,
		),
		"",
		"## Native Modules",
		"",
		...contract.nativeModules.map(module =>
			`- \`${module.moduleName}\` — \`${module.javaClass}\`; ${module.installedByHost ? "installiert" : "APK-Kandidat"}; ${module.methods.length} React-Methoden; ${module.events.length} Events; ${module.exportedConstants.length} exportierte Konstanten`,
		),
		"",
		"## View-Manager",
		"",
		...contract.viewManagers.map(view =>
			`- \`${view.viewName}\` — \`${view.javaClass}\`; NativeProps: ${view.nativeProps.length}; Bubbling-Events: ${view.bubblingEventTypes.length}; direkte Events: ${view.directEventTypes.length}; Commands: ${view.commands.length}; native Methoden: ${view.nativeMethods.join(", ") || "keine"}`,
		),
		"",
	];
	return lines.join("\n");
}

const decompiledRoot = findDecompiledRoot();
const hostPath = path.join(decompiledRoot, "com", "roborock", "smart", "react", "OooO.java");
const hostSource = fs.readFileSync(hostPath, "utf8");
const packageList = [
	extractAutomaticCorePackage(decompiledRoot),
	...extractReactPackages(hostSource, decompiledRoot),
];
const installedNativeModuleClasses = new Set(packageList.flatMap(item => item.nativeModuleClasses));
const installedViewManagerClasses = new Set(packageList.flatMap(item => item.viewManagerClasses));
const nativeModulePackageIndices = new Map<string, number[]>();
const viewManagerPackageIndices = new Map<string, number[]>();
for (const [packageIndex, packageItem] of packageList.entries()) {
	for (const javaClass of packageItem.nativeModuleClasses) {
		const indices = nativeModulePackageIndices.get(javaClass) ?? [];
		indices.push(packageIndex);
		nativeModulePackageIndices.set(javaClass, indices);
	}
	for (const javaClass of packageItem.viewManagerClasses) {
		const indices = viewManagerPackageIndices.get(javaClass) ?? [];
		indices.push(packageIndex);
		viewManagerPackageIndices.set(javaClass, indices);
	}
}

const nativeModules = [];
const viewManagers = [];
for (const filePath of walkJavaFiles(decompiledRoot)) {
	const source = fs.readFileSync(filePath, "utf8");
	const javaClass = extractJavaClass(source);
	if (!javaClass) continue;
	const inherited = inheritedSources(source, decompiledRoot);
	const moduleName = [source, ...inherited.map(item => item.source)]
		.map(candidate => extractModuleName(candidate))
		.find((candidate): candidate is { name: string; index: number } => candidate !== undefined);
	const methods = uniqueMethods([
		...inherited.flatMap(item => extractReactMethods(item.source)),
		...extractReactMethods(source),
	]);
	const relatedSources = relatedSamePackageSources(source, decompiledRoot);
	if (moduleName && (
		installedNativeModuleClasses.has(javaClass)
		|| methods.length > 0 && javaClass.startsWith("com.roborock.") && !source.includes("ViewManager")
	)) {
		nativeModules.push({
			javaClass,
			moduleName: moduleName.name,
			installedByHost: installedNativeModuleClasses.has(javaClass),
			hostPackageIndices: nativeModulePackageIndices.get(javaClass) ?? [],
			canOverrideExistingModule: canOverrideExistingModule(source),
			methods,
			events: [...new Set([
				...extractEvents(source),
				...relatedSources.flatMap(related => extractEvents(related.source)),
			])].sort(),
			exportedConstants: effectiveExportedConstants(filePath, source, inherited),
			evidence: evidence(filePath, source, moduleName.index),
		});
	}
	const viewName = extractViewName(source);
	const declaredProps = extractProps(source);
	const nativeViewClasses = relatedSources
		.filter(related => extractNativeMethods(related.source).length > 0)
		.map(related => related.javaClass)
		.sort();
	const nativeMethods = [...new Set([
		...extractNativeMethods(source),
		...relatedSources.flatMap(related => extractNativeMethods(related.source)),
	])].sort();
	if (viewName && (
		installedViewManagerClasses.has(javaClass)
		|| declaredProps.length > 0 && source.includes("ViewManager")
		|| javaClass.startsWith("com.shopify.reactnative.skia.") && source.includes("ViewManager")
	)) {
		const nativeProps = extractViewManagerNativeProps(filePath, source, inherited, decompiledRoot);
		const viewConstants = effectiveViewConstants(filePath, source, inherited);
		viewManagers.push({
			javaClass,
			viewName: viewName.name,
			installedByHost: installedViewManagerClasses.has(javaClass),
			hostPackageIndices: viewManagerPackageIndices.get(javaClass) ?? [],
			nativeViewClasses,
			props: nativeProps.map(prop => prop.name),
			nativeProps,
			bubblingEventTypes: effectiveViewManagerEvents(
				filePath,
				source,
				inherited,
				"getExportedCustomBubblingEventTypeConstants",
				extractBubblingEvents,
			),
			directEventTypes: effectiveViewManagerEvents(
				filePath,
				source,
				inherited,
				"getExportedCustomDirectEventTypeConstants",
				extractDirectEvents,
			),
			commands: effectiveViewManagerCommands(filePath, source, inherited),
			viewConstantsStatus: viewConstants.status,
			viewConstants: viewConstants.constants,
			nativeMethods,
			evidence: evidence(filePath, source, viewName.index),
		});
	}
}

for (const javaClass of installedNativeModuleClasses) {
	if (nativeModules.some(module => module.javaClass === javaClass)) continue;
	const filePath = javaClassPath(javaClass, decompiledRoot);
	if (!fs.existsSync(filePath)) {
		throw new Error(`Die vom APK-Host installierte Modulklasse fehlt: ${javaClass}`);
	}
	const source = fs.readFileSync(filePath, "utf8");
	const inherited = inheritedSources(source, decompiledRoot);
	const moduleName = [source, ...inherited.map(item => item.source)]
		.map(candidate => extractModuleName(candidate))
		.find((candidate): candidate is { name: string; index: number } => candidate !== undefined);
	if (!moduleName) {
		throw new Error(`Der Name der installierten APK-Modulklasse konnte nicht belegt werden: ${javaClass}`);
	}
	const relatedSources = relatedSamePackageSources(source, decompiledRoot);
	nativeModules.push({
		javaClass,
		moduleName: moduleName.name,
		installedByHost: true,
		hostPackageIndices: nativeModulePackageIndices.get(javaClass) ?? [],
		canOverrideExistingModule: canOverrideExistingModule(source),
		methods: uniqueMethods([
			...inherited.flatMap(item => extractReactMethods(item.source)),
			...extractReactMethods(source),
		]),
		events: [...new Set([
			...extractEvents(source),
			...relatedSources.flatMap(related => extractEvents(related.source)),
		])].sort(),
		exportedConstants: effectiveExportedConstants(filePath, source, inherited),
		evidence: evidence(filePath, source),
	});
}

for (const [packageIndex, packageItem] of packageList.entries()) {
	const packagePath = javaClassPath(packageItem.javaClass, decompiledRoot);
	if (!fs.existsSync(packagePath)) continue;
	const packageSource = fs.readFileSync(packagePath, "utf8");
	for (const registration of extractOnDemandViewManagerRegistrations(packageSource, decompiledRoot)) {
		const existing = viewManagers.find(viewManager => viewManager.javaClass === registration.javaClass);
		if (existing) {
			if (existing.viewName !== registration.viewName) {
				throw new Error(
					`APK-ViewManager-Klasse ${registration.javaClass} ist als ${existing.viewName} und ${registration.viewName} registriert`,
				);
			}
			continue;
		}
		const inherited = inheritedSources(registration.source, decompiledRoot).map(item => ({
			...item,
			source: withoutNestedClassBodies(item.source),
		}));
		const nativeProps = extractViewManagerNativeProps(
			registration.filePath,
			registration.source,
			inherited,
			decompiledRoot,
		);
		const viewConstants = effectiveViewConstants(registration.filePath, registration.source, inherited);
		viewManagers.push({
			javaClass: registration.javaClass,
			viewName: registration.viewName,
			installedByHost: true,
			hostPackageIndices: [packageIndex],
			nativeViewClasses: [],
			props: nativeProps.map(prop => prop.name),
			nativeProps,
			bubblingEventTypes: effectiveViewManagerEvents(
				registration.filePath,
				registration.source,
				inherited,
				"getExportedCustomBubblingEventTypeConstants",
				extractBubblingEvents,
			),
			directEventTypes: effectiveViewManagerEvents(
				registration.filePath,
				registration.source,
				inherited,
				"getExportedCustomDirectEventTypeConstants",
				extractDirectEvents,
			),
			commands: effectiveViewManagerCommands(registration.filePath, registration.source, inherited),
			viewConstantsStatus: viewConstants.status,
			viewConstants: viewConstants.constants,
			nativeMethods: [...new Set([
				...extractNativeMethods(registration.source),
				...inherited.flatMap(item => extractNativeMethods(item.source)),
			])].sort(),
			evidence: registration.evidence,
		});
	}
}

for (const javaClass of installedViewManagerClasses) {
	if (!viewManagers.some(viewManager => viewManager.javaClass === javaClass && viewManager.installedByHost)) {
		throw new Error(`Die vom APK-Host installierte ViewManager-Klasse fehlt im Vertrag: ${javaClass}`);
	}
}

nativeModules.sort((left, right) => left.moduleName.localeCompare(right.moduleName) || left.javaClass.localeCompare(right.javaClass));
viewManagers.sort((left, right) => left.viewName.localeCompare(right.viewName) || left.javaClass.localeCompare(right.javaClass));

const contract = {
	schemaVersion: 1,
	apk: {
		decompiledRoot: relativeToRepository(decompiledRoot),
		identity: path.basename(decompiledRoot),
	},
	runtime: {
		engine: "HERMES",
		bundlePathPattern: "<filesDir>/plugin_v3/<model>/index.android.bundle",
		mainModuleName: "index",
		lifecycleState: "BEFORE_CREATE",
	},
	host: {
		javaClass: "com.roborock.smart.react.OooO",
		packages: packageList,
		evidence: evidence(hostPath, hostSource, hostSource.indexOf("new ReactPackage[]")),
	},
	nativeModules,
	viewManagers,
	skia: {
		library: "rnskia",
		moduleName: "RNSkiaModule",
		managerClass: "com.shopify.reactnative.skia.SkiaManager",
		pictureView: "SkiaPictureView",
		domView: "SkiaDomView",
	},
};

fs.mkdirSync(generatedDirectory, { recursive: true });
fs.mkdirSync(path.dirname(documentationPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(contract, null, 2)}\n`, "utf8");
fs.writeFileSync(documentationPath, renderDocumentation(contract), "utf8");
console.log(JSON.stringify({
	output: relativeToRepository(outputPath),
	documentation: relativeToRepository(documentationPath),
	packages: packageList.length,
	nativeModules: nativeModules.length,
	viewManagers: viewManagers.length,
}, null, 2));
