require('./Array');

const pluginName = 'RemoveStyleScriptChunksPlugin';

module.exports = class RemoveStyleScriptChunksPlugin {
    hasCSSChunks(results) {
        return results.some(r => {
            return r.identifier.includes('mini-css-extract-plugin');
        });
    }

    isJavascriptChunk(result) {
        return result.pathOptions.contentHashType === 'javascript';
    }

    removeExtraChunksInPlace(results) {
        if (!this.hasCSSChunks(results)) {
            return;
        }
        results.forEach((item) => {
            if (item.filenameTemplate.match(/\.js$/)) {
                item.filenameTemplate = '[name].js';
            }
        })

        // results.rejectInPlace(this.isJavascriptChunk);
    }

    listenForAssets(template) {
        template.hooks.renderManifest.tap(
            pluginName,
            this.removeExtraChunksInPlace.bind(this)
        );
    }

    listenForEntires(template) {
        template.hooks.startup.tap(pluginName, (source, chunk, hash) => {
            if (chunk.hasEntryModule()) {
                for (const chunkGroup of chunk.groupsIterable) {
                    if (chunkGroup.chunks.length > 1) {
                        // console.log(chunkGroup, chunk);
                    }
                }
            }
        });
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap(pluginName, compilation => {
            // We can't register the tap until beforeChunkAssets
            // If we register it before then it won't be last
            compilation.hooks.beforeChunkAssets.tap(pluginName, () => {
                [compilation.mainTemplate].forEach(this.listenForEntires.bind(this));
                [compilation.chunkTemplate].forEach(this.listenForAssets.bind(this));
            });
        });
    }
};