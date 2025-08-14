import fs from "node:fs";
import path from "node:path";
import pc from "picocolors";

// FOR PROMISES

// const ruta = process.argv[2] ?? './'

// async function ls(ruta) {
//     let files
//     try {
//         files = await fsPromise.readdir(ruta)
//     } catch{
//         console.log(`No se pudo leer el directorio ${ruta}`);
//         process.exit(1)
//     }

//     const filesPromises = files.map( async file => {
//         const filePath = path.join(ruta, file)
//         let stats

//         try {
//             stats = await fsPromise.stat(filePath)
//         } catch (error) {
//             console.log(`No se pudo leer el archivo ${filePath}`);
//             process.exit(1)
//         }

//         const isDirectory = stats.isDirectory()
//         const fileType = isDirectory ? 'd-' : 'f-'
//         const fileSize = stats.size.toString()
//         const fileModified = stats.mtime.toLocaleString()

//         return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`
//     })

//     const filesInfo = await Promise.all(filesPromises)
//     filesInfo.forEach(fileInfo => console.log(fileInfo));
// }

// ls(ruta)

const dir = process.argv[2] ?? "./";
const absoluteDir = path.resolve(dir);

fs.readdir(absoluteDir, (err, files) => {
  if (err) {
    console.log("Error con la ruta:", absoluteDir);
    return;
  }

  files.forEach((file) => {
    let stats,
      filePath = path.join(absoluteDir, file);
    try {
      stats = fs.statSync(filePath);
    } catch (err) {
      console.log("Error al obtener las stats de:", filePath);
      process.exit(1);
    }
    const directorio = stats.isDirectory() ? pc.green("-D") : pc.blue("-A");
    const size = `${(stats.size / 1024).toFixed(1)}KB`;
    const date = `${stats.mtime.getDate()}-${
      stats.mtime.getMonth() + 1
    }-${stats.mtime.getFullYear()} ${stats.mtime.getHours()}:${stats.mtime.getMinutes()}:${stats.mtime.getSeconds()}`;

    const info = `${directorio} ${file.padEnd(35)}${pc.cyan(
      size.padEnd(10)
    )}${pc.yellow(date)}`;
    console.log(pc.bold(info));
  });
});
