import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import plugins from "./plugins.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

const site = lume({
  src: "./src",
});

site.use(plugins());
site.use(nunjucks());

export default site;

