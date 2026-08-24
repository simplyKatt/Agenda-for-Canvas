const args = process.argv.slice(2);
const platformArg = args[0];
const buildOptions = args.slice(1);

console.log("ARGUMENT DATA:")
console.log("Platform:", platformArg);
console.log("Build Options", buildOptions)
for (let i = 0; i < args.length; i++) {
  console.log("Argument:",args[i]);
}