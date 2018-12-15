//引入本文件夹内所有的接口
const EditorContext = require.context('./', true, /\.js$/);
let modules = {};
EditorContext.keys()
    .filter(item => item !== './index.js')
    .map((key) => {
        modules[key.replace('.js','').replace("./","").replace("/","_")]=EditorContext(key).default});
export default modules;