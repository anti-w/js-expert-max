import Camera from "../../lib/shared/camera.js";
import Controller from "./controller.js";
import View from "./view.js";

import { supportsWorkerType } from "../../lib/shared/util.js";

async function getWorker() {
  if (supportsWorkerType()) {
    console.log("suporta");
    const worker = new Worker("./worker.js", { type: "module" });
    return worker;
  }

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {},
  };

  console.log("não suprta");
  return workerMock;
}
const worker = await getWorker();

const camera = await Camera.init();
const [rootPath] = window.location.href.split("/pages/");
const factory = {
  async initalize() {
    return Controller.initialize({
      view: new View(),
      worker,
      camera,
    });
  },
};

export default factory;
