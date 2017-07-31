#!/bin/bash

rm dist/*

compilation_level='SIMPLE_OPTIMIZATIONS'
# compilation_level='WHITESPACE_ONLY'

# Build player lib

java -jar /usr/share/java/closure-compiler.jar \
    --compilation_level ${compilation_level} \
    	--use_types_for_optimization=true \
    	--summary_detail_level=3 \
    --js src/ondeplayer.js \
    --js src/ondeplayer.css.js \
    --js src/ondeplayer.html.js \
    --js src/__/__.js \
    --js src/ondeplayer.i18n.js \
    --js src/ondeplayer.svg.js \
    --entry_point src/ondeplayer.js \
 	   --language_in ECMASCRIPT_2017 \
    		--module_resolution BROWSER \
    		--js_module_root src --jscomp_off internetExplorerChecks \
    --js_output_file dist/ondeplayer.js \
    	--language_out ECMASCRIPT5_STRICT \
    --create_source_map dist/ondeplayer.js.map 


# Copy playlist service

for file in 'index.html' 'ondeplaylist.js' 'ondeplaylist.css'
	do
	cp src/${file} dist/${file}
done

