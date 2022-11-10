import { sassPlugin } from 'esbuild-sass-plugin';
import esbuild from 'esbuild';

await esbuild.build({
    plugins: [sassPlugin()],
    entryPoints: ['./src/js/index.tsx'],
    outdir: 'dist',
    loader: { '.js': 'jsx' },
    external: [
        'react',
        'react-dom',
        // TODO: Remove when flux is removed
        'flux'
    ],
    bundle: true,
    format: 'esm'
});
