const storeContext = require.context('./', true, /\.js$/);
let modules = {};
storeContext.keys()
    .filter(item => item !== './index.js')
    .map((key) => {
        modules[key.replace('.js','').replace("./","").replace("/","_")]=storeContext(key).default});
const index =new Vuex.Store({
    modules:modules
})
export default index;