#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
OUTPUT_DIR="${DIR}/output"
mkdir -p ${OUTPUT_DIR}
zip "${OUTPUT_DIR}/api-handler.zip" "${DIR}/../index.js"