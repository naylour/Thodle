import uploadFile from "./uploadFile";

console.log(await uploadFile(Bun.file('./package.json'), '/settinsg'))
// console.log(getPath('/avatar', './hello.json'))
