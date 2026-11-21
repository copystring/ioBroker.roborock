import { z } from "zod";

const text = z.string().regex(/\S/, "Expected non-blank text");
const scalar = z.union([z.number(), z.string(), z.boolean()]);
const placement = z.strictObject({
	menuPath: z.array(z.strictObject({ kind: z.enum(["tab", "section", "screen"]), text })),
	valueType: z.enum(["number", "string", "boolean"]),
	options: z.array(z.strictObject({ value: scalar, label: text })),
	evidence: z.enum(["bundle_code", "offline_bundle_run_for_model_and_tab"]),
}).superRefine((entry, ctx) => {
	const seen = new Set<z.infer<typeof scalar>>();
	entry.options.forEach(({ value }, index) => {
		const path = ["options", index, "value"];
		if (typeof value !== entry.valueType) ctx.addIssue({ code: "custom", path, message: "Option type differs from valueType" });
		if (seen.has(value)) ctx.addIssue({ code: "custom", path, message: "Duplicate option value in this placement" });
		seen.add(value);
	});
});

export const bundleControlV1Schema = z.strictObject({
	schemaVersion: z.literal(1),
	source: z.strictObject({ model: text, bundleVersion: z.int().nonnegative(), locale: text }),
	id: text.nullable(),
	idCandidate: z.strictObject({
		value: text,
		derivedFrom: z.array(z.enum(["view.name", "title.key"])).min(1),
		status: z.literal("candidate"),
		uniqueness: z.enum(["not_verified", "ambiguous", "verified"]),
	}).nullable(),
	view: z.strictObject({ name: text, evidence: z.literal("bundle_code") }),
	title: z.strictObject({ key: text, text, evidence: z.literal("bundle_code_and_translation") }),
	placements: z.array(placement).min(1),
	value: z.discriminatedUnion("status", [
		z.strictObject({ status: z.literal("not_measured"), current: z.null() }),
		z.strictObject({ status: z.literal("measured"), current: scalar }),
	]),
	action: z.strictObject({
		handler: text,
		handlerEvidence: z.literal("bundle_code"),
		deviceEffect: z.enum(["not_verified", "local_only", "verified_device_command"]),
		boundToCommand: z.boolean(),
	}).nullable(),
}).superRefine((entry, ctx) => {
	if (entry.idCandidate?.value === entry.id && entry.idCandidate.uniqueness !== "verified") {
		ctx.addIssue({ code: "custom", path: ["id"], message: "Candidate uniqueness has not been verified" });
	}
	if (entry.action?.boundToCommand && entry.action.deviceEffect !== "verified_device_command") {
		ctx.addIssue({ code: "custom", path: ["action", "boundToCommand"], message: "Binding requires a verified device command" });
	}
	const type = entry.placements[0].valueType;
	entry.placements.forEach((item, index) => {
		if (item.valueType !== type) ctx.addIssue({ code: "custom", path: ["placements", index, "valueType"], message: "One control must have one value type" });
	});
	if (entry.value.status === "measured" && typeof entry.value.current !== type) {
		ctx.addIssue({ code: "custom", path: ["value", "current"], message: "Measured value type differs from the control type" });
	}
});

export interface BundleControlV1 extends z.infer<typeof bundleControlV1Schema> {}
