#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
OUTPUT_DIR="${DIR}/output"
mkdir -p ${OUTPUT_DIR}
zip -jr "${OUTPUT_DIR}/api-handler.zip" "${DIR}/output/index.js"