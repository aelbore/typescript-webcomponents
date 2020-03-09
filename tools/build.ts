import { watcher, rollupBuild, createTSRollupConfig, clean } from 'aria-build'

(async function() {

  const options = createTSRollupConfig({
    input: './src/hello-world.ts'
  })

  await clean('dist')
  await rollupBuild(options)
  await watcher('./src', {
    async onReady(files: string[]) {
      console.log(`> Initial scan complete. Ready for changes. Total files: ${files.length}`)
      await import('./server')
    },
    async onChange(file: string, stats: import('fs').Stats) {
      console.log(`File: ${file} was changed.`)
      await clean('dist')
      await rollupBuild(options)
    }
  })

})()