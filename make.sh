#!/bin/bash

# Build player lib

java -jar /usr/share/java/closure-compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS --jscomp_warning=missingProperties --use_types_for_optimization=true --summary_detail_level=3 \
    --language_out ECMASCRIPT5_STRICT --jscomp_off internetExplorerChecks \
    --js_output_file=dist/ondeplayer.js --js src/ondeplayer.js


# Copy playlist service

for file in 'index.html' 'ondeplaylist.js' 'ondeplaylist.css'
	do
	cp src/$file dist/$file
done

