import JSZip from "jszip";

export async function downloadBundle(bundleName, files) {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.content);
  });

  const blob = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${bundleName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}