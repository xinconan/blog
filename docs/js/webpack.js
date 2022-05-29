class Compiler {
  // beforeRun run beforeCompile compile make finishMake afterCompile
  run() {
    const onCompiled = () => { }
    const run = () => {
      this.hooks.beforRun.callAsync(this, err => {
        this.hooks.run.callAsync(this, err => {
          this.compile(onCompiled)
        })
      })
    };
    // 不管是否空闲，都会执行run方法
    run();
  }

  compile(callback) {
    const params = this.newCompilationParams();
    // 先执行beforeCompile，再执行compile 事件
    this.hooks.beforeCompile.callAsync(params, err => {
      this.hooks.compile.call(params);
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        this.hooks.finishMake.callAsync(compilation, err => {

        })
      });
    })
  }
}

const createCompiler = () => {
  const compiler = new Compiler();
  return compiler;
}
const webpack = (options, callback) => {
  const create = () => {
    const compiler = createCompiler();
    return { compiler }
  };
  if (callback) {
    const { compiler } = create();
    return compiler;
  } else {
    const { compiler } = create();
    return compiler;
  }
};