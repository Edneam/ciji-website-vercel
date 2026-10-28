import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** The supplied camera originals are ~10MB each. The site serves the compressed copies. */
function omitRawProjectPhotos() {
  return {
    name: 'omit-raw-project-photos',
    apply: 'build',
    closeBundle() {
      rmSync(join(process.cwd(), 'dist', 'images', 'CIJI FINISHED'), {
        recursive: true,
        force: true,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), omitRawProjectPhotos()],
})
