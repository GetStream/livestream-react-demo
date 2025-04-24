#!/usr/bin/env bash

script_dir=$(dirname "$0")
cd "$script_dir"
svg_files=$(ls *.svg)

> index.ts

for file in $svg_files; do
  icon_name=$(basename "$file" .svg)
  echo "export { default as $icon_name } from './$icon_name.svg?url';" >> index.ts
done

cd - > /dev/null
