#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd $SCRIPT_ROOT/..

API_DOC_OUTPUT_DIR=docs/en-us/api
SRC_DIR=src/lib

rm -rf $API_DOC_OUTPUT_DIR

# check if any files in src is not stashed in git
if [[ -n $(git status --porcelain $SRC_DIR) ]]; then
    echo "Error: You have unstaged changes. Please commit or stash them before generating API docs."
    exit 1
fi

rm $(find $SRC_DIR -name '*.test.ts' -type f)

npx typedoc \
    --out api \
    --readme none \
    --name "Documents for @litert/jwt" \
    --plugin typedoc-plugin-markdown \
    --plugin typedoc-vitepress-theme \
    --sourceLinkTemplate "https://github.com/litert/jwt.js/blob/master/{path}#L{line}" \
    $SRC_DIR/*.ts \
    $SRC_DIR/Validators/*.ts \
    $SRC_DIR/Algorithms/*.ts \
    $SRC_DIR/CoreApis/*.ts \
    $SRC_DIR/ManagedApis/*.ts

mkdir -p $(dirname $API_DOC_OUTPUT_DIR)
mv api $API_DOC_OUTPUT_DIR

git checkout $SRC_DIR
