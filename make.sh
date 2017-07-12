#!/bin/bash

rm dist/*

# Build player lib

java -jar /usr/share/java/closure-compiler.jar \
    --compilation_level SIMPLE_OPTIMIZATIONS \
    	--use_types_for_optimization=true \
    	--summary_detail_level=3 \
    --js src/ondeplayer.js \
    --js src/ondeplayer.css.js \
    --js src/ondeplayer.html.js \
    --entry_point src/ondeplayer.js \
 	   --language_in ECMASCRIPT_2017 \
    		--module_resolution BROWSER \
    		--js_module_root src --jscomp_off internetExplorerChecks \
    --js_output_file dist/ondeplayer.js \
    	--language_out ECMASCRIPT5_STRICT \
    


# Copy playlist service

for file in 'index.html' 'ondeplaylist.js' 'ondeplaylist.css'
	do
	cp src/$file dist/$file
done

