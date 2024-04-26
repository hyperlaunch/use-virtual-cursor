import dts from "bun-plugin-dts";

const packageJson = await Bun.file("package.json").json();
const packageDist = {
	...packageJson,
	main: "dist/index.js",
	modules: "dist/index.js",
	typings: "dist/index.d.ts",
	type: "module",
	files: ["dist/**/*"],
};
await Bun.write("package/package.json", JSON.stringify(packageDist));

await Bun.write("package/README.md", Bun.file("README.md"));

await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./package/dist",
	external: ["react"],
	plugins: [dts()],
});
